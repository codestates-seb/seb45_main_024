import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { validationActions } from "../../redux/auth/validationSlice"; // 프론트단 유효성 검사 슬라이스
import { loginUser } from "../../redux/auth/loginSlice"; // 로그인폼 서버 제출 슬라이스
import { setAlertMessage } from "../../redux/common/alertSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import Loading from "../common/Loading";

// response.data? response.payload?

interface LoginData {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("popstate", () => {
      navigate("/");
    });

    return () => {
      window.removeEventListener("popstate", () => {
        navigate("/");
      });
    };
  }, [navigate]);

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
    }

    // password 필드를 업데이트하고 유효성 검사 수행
    if (fieldName === "password") {
      setFormData(prevState => ({
        ...prevState,
        password: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 이메일 및 비밀번호의 유효성 검사를 수행하고 오류를 가져옴
    const emailValidationError = dispatch(
      validationActions.validEmail(formData.email),
    );
    const passwordValidationError = dispatch(
      validationActions.validPassword(formData.password),
    );

    // 유효성 검사를 통과하지 못한 경우
    if (emailValidationError || passwordValidationError) {
      // 각각의 오류를 상태에 업데이트
      if (emailValidationError) {
        dispatch({ type: "validation/emailError", payload: true });
      }
      if (passwordValidationError) {
        dispatch({ type: "validation/passwordError", payload: true });
      }
      // 로그인 상태를 false로 설정

      dispatch({ type: "login/setIsLoggedIn", payload: false });
    }

    const registerData = {
      email: formData.email,
      password: formData.password,
    };

    // 유효성 검사를 통과한 경우 로그인 요청을 보냄
    await dispatch(loginUser(registerData));

    // 로그인 요청 후 처리
    if (getTokensFromLocalStorage()) {
      dispatch(setAlertMessage("로그인 됐어요"));
      dispatch(validationActions.resetValidation());
      navigate("/");
    } else {
      if (emailValidationError && !passwordValidationError) {
        setFormData({
          email: "",
          password: formData.password,
        });
      } else if (passwordValidationError && !emailValidationError) {
        setFormData({
          email: formData.email,
          password: "",
        });
      } else if (!passwordValidationError && !emailValidationError) {
        setFormData({
          email: formData.email,
          password: formData.password,
        });
      }
      setFormData({
        email: formData.email,
        password: formData.password,
      });
      alert(`로그인 과정에 오류가 있습니다`);
      dispatch({ type: "login/setIsLoggedIn", payload: false });
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
        >
          Log in
        </button>
      </form>
      {loading === "pending" && <Loading />}
    </div>
  );
};

export default Login;
