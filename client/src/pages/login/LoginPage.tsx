import { FC } from "react";
import classes from "./LoginPage.module.css";
import Logo from "../../components/common/Logo";
import Login from "../../components/login/Login";
// import SocialLogin from "../../components/login/SocialLogin";

const LoginPage: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo />
      </div>
      {/* <SocialLogin /> */}
      <Login />
    </div>
  );
};

export default LoginPage;
