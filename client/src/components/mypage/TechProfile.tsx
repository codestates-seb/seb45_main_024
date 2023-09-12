import { FC } from "react";
import classes from "./TechProfile.module.css";
import logo_green_face from "../../assets/images/logo_green_face.png";

interface TechProfileProps {
  techName: string;
  id: number;
}

const TechProfile: FC<TechProfileProps> = ({ techName }) => {
  return (
    <div className={classes.techContent}>
      <div className={classes.techImgContainer}>
        <img
          className={classes.techImg}
          src={logo_green_face}
          alt="sample image"
        />
      </div>
      <p className={classes.techTitle}>{techName}</p>
    </div>
  );
};

export default TechProfile;
