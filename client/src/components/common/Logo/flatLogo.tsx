import { FC } from "react";
import classes from "./flatLogo.module.css";
import flatSmoothie from "../../../assets/images/flatLogo.svg";
import { useNavigate } from "react-router-dom";

const FlatLogo: FC = () => {
  const navigate = useNavigate();

  const handleNaviagteToMain = () => {
    navigate("/");
  };

  return (
    <>
      <img
        alt="logo"
        src={flatSmoothie}
        className={classes.logo}
        onClick={handleNaviagteToMain}
      />
    </>
  );
};

export default FlatLogo;
