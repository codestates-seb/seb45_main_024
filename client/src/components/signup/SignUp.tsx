import SocialSignUp from "./SocialSignUp";
import classes from "./SignUp.module.css";

import { useState } from "react";
import { validationActions } from "../../redux/validationSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

function SignUp() {
  const dispatch = useAppDispatch();
  const emailError = useAppSelector(state => state.validation.emailError);
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(validationActions.validEmail(email));
  };

  return (
    <div className={classes.container}>
      <img alt="logo"></img>
      <SocialSignUp />
      <form className={classes.signUp} onSubmit={handleSubmit}>
        <div className={classes.inputInfo}>
          <label>Nickname</label>
          <input placeholder="Input Nickname" type="text" />
          <p>닉네임은 2글자 이상 7글자 이하여야 합니다</p>
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
          <input placeholder="Input Password" type="password" />
          <p>비밀번호는 5글자 이상이어야 합니다</p>
        </div>
        <div className={classes.inputInfo}>
          <label>Confirm Password</label>
          <input placeholder="Input Password Again" type="password" />
          <p>비밀번호가 일치하지 않습니다</p>
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
