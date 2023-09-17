import { FC } from "react";
import classes from "./circleLogo.module.css";
import smoothie from "../../../assets/images/logo-circle.svg";
import { useNavigate } from "react-router-dom";

const Logo: FC = () => {
  const navigate = useNavigate();

  const handleNaviagteToMain = () => {
    navigate("/");
  };

  return (
    <>
      <img
        alt="logo"
        src={smoothie}
        className={classes.logo}
        onClick={handleNaviagteToMain}
      />
    </>
  );
};

export default Logo;
