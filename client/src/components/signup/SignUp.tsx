import { FC } from "react";
import SocialSignUp from "./SocialSignUp";
import classes from "./SignUp.module.css";

import { useState } from "react";
import { authActions } from "../../redux/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const SignUp: FC = () => {
  const dispatch = useAppDispatch();

  const nicknameError = useAppSelector(state => state.auth.nicknameError);
  const [nickname, setNickname] = useState<string>("");
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
  };

  const emailError = useAppSelector(state => state.auth.emailError);
  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const passwordError = useAppSelector(state => state.auth.passwordError);
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const confirmPasswordError = useAppSelector(
    state => state.auth.confirmPasswordError,
  );
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(authActions.validNickname(nickname));
    dispatch(authActions.validEmail(email));
    dispatch(authActions.validPassword(password));
    dispatch(authActions.coinCidePassword(confirmPassword));
  };

  return (
    <div className={classes.container}>
      <img alt="logo"></img>
      <SocialSignUp />
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Nickname</label>
          <input
            placeholder="Input Nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
          />
          {nicknameError && <p>닉네임은 2글자 이상 7글자 이하여야 합니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Email</label>
          <input
            placeholder="Input Email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p>유효한 이메일 형식이 아닙니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Password</label>
          <input
            placeholder="Input Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p>비밀번호는 5글자 이상이어야 합니다</p>}
        </div>
        <div className={classes.inputInfo}>
          <label>Confirm Password</label>
          <input
            placeholder="Input Password Again"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && <p>비밀번호가 일치하지 않습니다</p>}
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
