import { FC } from "react";
import classes from "./TechProfile.module.css";
import default_profile from "../../../assets/images/default_profile.svg";

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
          src={default_profile}
          alt="sample image"
        />
      </div>
      <p className={classes.techTitle}>{techName}</p>
    </div>
  );
};

export default TechProfile;
