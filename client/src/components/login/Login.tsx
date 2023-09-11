import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { loginUser } from "../../redux/auth/loginSlice";
import { setAlertMessage } from "../../redux/utility/alertSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Loading from "../common/Loading";

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
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
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

    const registerData = {
      email: formData.email,
      password: formData.password,
    };
    await dispatch(loginUser(registerData));
    // 일단 슬라이스 내에서 성공이든 실패든, 반응이 있으므로 try 구문으로 넘어가는 건가?
    // 그럼 catch로 간다면, 그건 디스패치 되지 않았을 때일까? 아니, catch 구문으로 넘어갈 일이 있나?
    // 만약 이렇다면 굳이 handleSubmit 함수를 비동기처리할 필요가 있을까
    // 그냥 조건문 분기로 나누면 되는 거 아닌가
    try {
      if (isLoggedIn) {
        // 로그인 성공 처리
        // dispatch({ type: "login/setIsLoggedIn", payload: true });
        dispatch(setAlertMessage("로그인 됐어요"));
        navigate("/");
        console.log("왜 로그인 돼?");
      } else {
        setFormData({
          email: "",
          password: "",
        });
        console.log("멀쩡히 돌아가는 거 맞아");
        dispatch(validationActions.resetValidation());
        // dispatch({ type: "login/setIsLoggedIn", payload: false });
        console.error("로그인 실패");
        alert(`로그인 실패`);
      }
      // else문과 catch문의 차이? 혹은 병합하는 게 나으려나?
    } catch (error) {
      // 정말정말 예외적인 상황(?)
      setFormData({
        email: "",
        password: "",
      });
      dispatch(validationActions.resetValidation());
      dispatch({ type: "login/setIsLoggedIn", payload: false });
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
      {loading === "pending" && <Loading />}
    </div>
  );
};

export default Login;
