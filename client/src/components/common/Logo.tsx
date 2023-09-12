import { FC } from "react";
import classes from "./Logo.module.css";
import smoothie from "../../assets/images/logo-circle.svg";

const Logo: FC = () => {
  return (
    <>
      <img alt="logo" src={smoothie} className={classes.logo} />
    </>
  );
};

export default Logo;
