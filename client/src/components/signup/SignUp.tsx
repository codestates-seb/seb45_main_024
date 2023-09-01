import SocialSignUp from "./SocialSignUp";
import classes from "./SignUp.module.css";

function SignUp() {
  return (
    <div className={classes.container}>
      <img alt="logo"></img>
      <SocialSignUp />
      <form className={classes.signUp}>
        <div className={classes.inputInfo}>
          <label>Nickname</label>
          <input placeholder="Input Nickname" type="text" />
          <p>닉네임은 2글자 이상 7글자 이하여야 합니다</p>
        </div>
        <div className={classes.inputInfo}>
          <label>Email</label>
          <input placeholder="Input Email" type="text" />
          <p>유효한 이메일 형식이 아닙니다</p>
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
