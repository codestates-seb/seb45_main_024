import { FC } from "react";
import SignUp from "../../components/signup/SignUp";
import classes from "./SignUpPage.module.css";

const SignUpPage: FC = () => {
  return (
    <div className={classes.container}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
