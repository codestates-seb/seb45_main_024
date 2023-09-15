import { FC } from "react";
import classes from "./LoginPage.module.css";
import FlatLogo from "../../components/common/Logo/flatLogo";
import Login from "../../components/login/Login";
import { useNavigate } from "react-router-dom";
// import SocialLogin from "../../components/login/SocialLogin";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleClickToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <FlatLogo />
      </div>
      {/* <SocialLogin /> */}
      <Login />
      <p className={classes.signUpMessage}>
        아직 회원이 아니신가요?{"  "}
        <span onClick={handleClickToSignUp}>회원가입</span>
      </p>
    </div>
  );
};

export default LoginPage;
