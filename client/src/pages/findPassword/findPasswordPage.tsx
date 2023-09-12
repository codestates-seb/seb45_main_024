import { FC } from "react";
import classes from "./findPasswordPage.module.css";
import FindPassword from "../../components/security/findPassword";
import Logo from "../../components/common/Logo";

const FindPasswordPage: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <FindPassword />
    </div>
  );
};

export default FindPasswordPage;
