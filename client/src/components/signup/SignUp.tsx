import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignUp.module.css";
import { validationActions } from "../../redux/auth/validationSlice";
import { signUpUser } from "../../redux/auth/signUpSlice";
import { setAlertMessage } from "../../redux/utility/alertSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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

  const loading = useAppSelector(state => state.signUp.loading);

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

    try {
      const response = await dispatch(signUpUser(registerData));

      if (response.payload.status === 201) {
        // 회원가입 성공 처리
        setAlertMessage(response.payload.message);
        navigate("/login"); // 회원가입 성공 시, 로그인 경로로 이동
      } else {
        // 회원가입 실패 처리
        setAlertMessage(response.payload.message);
      }
    } catch (error) {
      // 회원가입 오류 처리
      console.error("로그인 오류:", error);
      alert(`회원가입 과정에 오류가 있습니다 : ${error}`);
    }
  };

  return (
    <div className={classes.container}>
      <img alt="logo"></img>

      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Nickname</label>
          <input
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
      {loading === "pending" && <p>로딩 중...</p>}
      {/* 얘는 모달 식으로 디자인 보완 더 필요할듯 */}
    </div>
  );
};

export default SignUp;
