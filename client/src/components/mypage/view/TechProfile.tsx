import { FC } from "react";
import classes from "./TechProfile.module.css";
import GetLogo from "../format/GetLogo";

interface TechProfileProps {
  techName: string;
  id: number;
  onClick?: () => void;
}

const TechProfile: FC<TechProfileProps> = ({ techName, onClick }) => {
  return (
    <div className={classes.techContent} onClick={onClick}>
      <div className={classes.techImgContainer}>
        <GetLogo logoTitle={techName} />
      </div>
      <p className={classes.techTitle}>{techName}</p>
    </div>
  );
};

export default TechProfile;
