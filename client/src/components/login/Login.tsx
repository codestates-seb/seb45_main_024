import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { loginUser } from "../../redux/auth/loginSlice";
import { setAlertMessage } from "../../redux/utility/alertSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

// response.data? response.payload?

interface LoginData {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailError = useAppSelector(state => state.validation.emailError);
  const passwordError = useAppSelector(state => state.validation.passwordError);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const loading = useAppSelector(state => state.login.loading);
  // const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;

    // email 필드를 업데이트하고 유효성 검사 수행
    if (fieldName === "email") {
      setFormData(prevState => ({
        ...prevState,
        email: value,
      }));
      dispatch(validationActions.validEmail(value));
    }

    // password 필드를 업데이트하고 유효성 검사 수행
    if (fieldName === "password") {
      setFormData(prevState => ({
        ...prevState,
        password: value,
      }));
      dispatch(validationActions.validPassword(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // createAsyncThunk 써먹기... 이번엔 토큰 작업까지...

    const registerData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await dispatch(loginUser(registerData));

      if (response.payload.status === 201) {
        // 로그인 성공 처리
        setAlertMessage(response.payload.message);
        navigate("/mainpage"); // 로그인 성공 시, 메인페이지 경로로 이동
      } else {
        // 로그인 실패 처리(400번대 클라이언트)
        setAlertMessage(response.payload.message);
      }
    } catch (error) {
      // 로그인 오류 처리(500번대 서버)
      console.error("로그인 오류:", error);
      alert(`로그인 과정에 오류가 있습니다 : ${error}`);
    }
  };

  const handleFindPwdNavigate = () => {
    navigate("/findpassword");
  };

  return (
    <div className={classes.container}>
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Email</label>
          <input
            ref={emailInputRef}
            placeholder="Input Email"
            type="text"
            value={formData.email}
            onChange={e => handleInputChange(e, "email")}
          />
          {emailError && (
            <p className={classes.errorMessage}>
              유효한 이메일 형식이 아닙니다
            </p>
          )}
        </div>
        <div className={classes.inputInfo}>
          <label>Password</label>
          <input
            placeholder="Input Password"
            type="password"
            value={formData.password}
            onChange={e => handleInputChange(e, "password")}
          />
          <div className={classes.flexContainer}>
            {passwordError && (
              <p className={classes.errorMessage}>
                비밀번호는 5글자 이상이어야 합니다
              </p>
            )}
            <p
              className={classes.forgotPassword}
              onClick={handleFindPwdNavigate}
            >
              Forgot Password?
            </p>
          </div>
        </div>
        <button
          className={`${
            emailError || passwordError ? `${classes.disabledButton}` : ""
          }`}
          disabled={emailError || passwordError}
        >
          Log in
        </button>
      </form>
      {loading === "pending" && <p>로딩 중...</p>}
      {/* 얘는 모달 식으로 디자인 보완 더 필요할듯 */}
    </div>
  );
};

export default Login;
