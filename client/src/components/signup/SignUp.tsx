import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { signUpUser } from "../../redux/auth/signUpSlice";
import { setAlertMessage } from "../../redux/utility/alertSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Loading from "../common/Loading";

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// interface ServerResponse {
//   status: number;
//   exception: string;
//   message: string;
// }

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nicknameError = useAppSelector(state => state.validation.nicknameError);
  const emailError = useAppSelector(state => state.validation.emailError);
  const passwordError = useAppSelector(state => state.validation.passwordError);
  const confirmPasswordError = useAppSelector(
    state => state.validation.confirmPasswordError,
  );

  const [formData, setFormData] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nickNameInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (nickNameInputRef.current) {
      nickNameInputRef.current.focus();
    }
  }, []);

  const loading = useAppSelector(state => state.signUp.loading);
  const isSignedUp = useAppSelector(state => state.signUp.isSignedUp);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });

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

    if (fieldName === "nickname") {
      setFormData(prevState => ({
        ...prevState,
        nickname: value,
      }));
      dispatch(validationActions.validNickname(value));
    }

    if (fieldName === "confirmPassword") {
      setFormData(prevState => ({
        ...prevState,
        confirmPassword: value,
      }));
      dispatch(validationActions.coinCidePassword(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerData = {
      nickname: formData.nickname,
      email: formData.email,
      password: formData.password,
    };

    await dispatch(signUpUser(registerData));
    try {
      if (isSignedUp) {
        // 회원가입 성공 처리
        console.log("회원가입 됐다네");
        dispatch(setAlertMessage("회원가입 됐어요"));
        navigate("/login"); // 회원가입 성공 시, 로그인 경로로 이동
      } else {
        // 회원가입 실패 처리
        // if (response.status === 409) {
        //   console.log(response.data.message);
        // }
        dispatch(setAlertMessage("회원가입 안 됐다네"));
        setFormData({
          nickname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        dispatch(validationActions.resetValidation());
        console.error("회원가입 실패");
        alert(`회원가입 실패`);
      }
    } catch (error) {
      // 회원가입 오류 처리
      setFormData({
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      console.error("회원가입 오류:", error);
      alert(`회원가입 과정에 오류가 있습니다 : ${error}`);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Nickname</label>
          <input
            ref={nickNameInputRef}
            placeholder="Input Nickname"
            type="text"
            value={formData.nickname}
            onChange={e => handleInputChange(e, "nickname")}
          />
          {nicknameError && <p>닉네임은 2글자 이상 7글자 이하여야 합니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Email</label>
          <input
            placeholder="Input Email"
            type="text"
            value={formData.email}
            onChange={e => handleInputChange(e, "email")}
          />
          {emailError && <p>유효한 이메일 형식이 아닙니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Password</label>
          <input
            placeholder="Input Password"
            type="password"
            value={formData.password}
            onChange={e => handleInputChange(e, "password")}
          />
          {passwordError && <p>비밀번호는 5글자 이상이어야 합니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Confirm Password</label>
          <input
            placeholder="Input Password Again"
            type="password"
            value={formData.confirmPassword}
            onChange={e => handleInputChange(e, "confirmPassword")}
          />
          {confirmPasswordError && <p>입력한 비밀번호와 일치해야 합니다</p>}
        </div>
        <button
          className={`${
            emailError || passwordError || nicknameError || confirmPasswordError
              ? `${classes.disabledButton}`
              : ""
          }`}
          disabled={
            emailError || nicknameError || confirmPasswordError || passwordError
          }
        >
          Sign Up
        </button>
      </form>
      {loading === "pending" && <Loading />}
    </div>
  );
};

export default SignUp;
