import { FC } from "react";
import classes from "./NoContent.module.css";
import facelogo from "../../../assets/images/logo_green_face.png";

const NoContent: FC = () => {
  return (
    <div className={classes.noContentContainer}>
      <img className={classes.facelogo} src={facelogo} alt="green face logo" />
      <p className={classes.helpText}>아직 작성하신 내용이 없어요!</p>
    </div>
  );
};

export default NoContent;
