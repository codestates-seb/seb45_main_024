import { FC } from "react";
import Logo from "../../components/common/Logo";
import SignUp from "../../components/signup/SignUp";
import SocialSignUp from "../../components/signup/SocialSignUp";
import classes from "./SignUpPage.module.css";

const SignUpPage: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <SocialSignUp />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
