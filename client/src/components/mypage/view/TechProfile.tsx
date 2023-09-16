import { FC } from "react";
import classes from "./TechProfile.module.css";
import GetLogo from "../format/GetLogo";

interface TechProfileProps {
  techName: string;
  id: number;
}

const TechProfile: FC<TechProfileProps> = ({ techName }) => {
  return (
    <div className={classes.techContent}>
      <div className={classes.techImgContainer}>
        <GetLogo logoTitle={techName} />
      </div>
      <p className={classes.techTitle}>{techName}</p>
    </div>
  );
};

export default TechProfile;
