import { FC } from "react";
import classes from "./LoginPage.module.css";
import Login from "../../components/login/Login";
import SocialLogin from "../../components/login/SocialLogin";

const LoginPage: FC = () => {
  return (
    <div className={classes.container}>
      <img alt="logo" />
      <SocialLogin />
      <Login />
    </div>
  );
};

export default LoginPage;
