import { FC } from "react";
import FlatLogo from "../../components/common/Logo/flatLogo";
import SignUp from "../../components/signup/SignUp";
// import SocialSignUp from "../../components/signup/SocialSignUp";
import classes from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";

const SignUpPage: FC = () => {
  const navigate = useNavigate();

  const handleClickToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <FlatLogo />
      </div>
      {/* <SocialSignUp /> */}
      <SignUp />
      <p className={classes.loginMessage}>
        이미 회원이신가요?{"  "}
        <span onClick={handleClickToLogin}>로그인</span>
      </p>
    </div>
  );
};

export default SignUpPage;
