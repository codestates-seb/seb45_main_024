import { FC } from "react";
import classes from "./Login.module.css";

const Login: FC = () => {
  return (
    <div className={classes.container}>
      <form className={classes.signUp}>
        <div className={classes.inputInfo}>
          <label>Email</label>
          <input placeholder="Input Email" type="text" />
          <p className={classes.errorMessage}>유효한 이메일 형식이 아닙니다</p>
        </div>
        <div className={classes.inputInfo}>
          <label>Password</label>
          <input placeholder="Input Password" type="password" />
          <div className={classes.flexContainer}>
            <p className={classes.errorMessage}>
              비밀번호는 5글자 이상이어야 합니다
            </p>
            <p className={classes.forgotPassword}>Forgot Password?</p>
          </div>
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
