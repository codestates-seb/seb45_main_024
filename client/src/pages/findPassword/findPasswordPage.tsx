import { FC } from "react";
import classes from "./findPasswordPage.module.css";
import FindPassword from "../../components/security/findPassword";
import CircleLogo from "../../components/common/Logo/circleLogo";
import { useNavigate } from "react-router-dom";

const FindPasswordPage: FC = () => {
  const navigate = useNavigate();
  const handleClickToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={classes.field}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <CircleLogo />
        </div>
        <FindPassword />
        <p className={classes.loginMessage}>
          비밀번호가 기억나셨나요?{"  "}
          <span onClick={handleClickToLogin}>로그인</span>
        </p>
      </div>
    </div>
  );
};

export default FindPasswordPage;
