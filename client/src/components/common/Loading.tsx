import { FC } from "react";
import classes from "./Loading.module.css";
import loadingSmoothie from "../../assets/images/logo_loading.svg";

const Loading: FC = () => {
  return (
    <div className={classes.field}>
      <div className={classes.rotatedLogo}>
        <img alt="logo" src={loadingSmoothie} />
      </div>
      <p>Please Wait a Moment</p>
    </div>
  );
};

export default Loading;
