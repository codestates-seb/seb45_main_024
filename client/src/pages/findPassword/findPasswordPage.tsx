import { FC } from "react";
import classes from "./findPasswordPage.module.css";
import FindPassword from "../../components/security/findPassword";

const FindPasswordPage: FC = () => {
  return (
    <div className={classes.container}>
      <img alt="logo"></img>
      <FindPassword />
    </div>
  );
};

export default FindPasswordPage;
