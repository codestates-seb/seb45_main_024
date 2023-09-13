import { FC, useState } from "react";
import classes from "./HardProfile.module.css";

interface HardProfileProps {
  techName: string;
  level: string;
}

const HardProfile: FC<HardProfileProps> = ({ techName, level }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className={classes.hardContainer}>
      {isHovered ? (
        <div
          className={`${classes.tagContainer} ${classes.level}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className={classes.tagName}>level.{level}</span>
        </div>
      ) : (
        <div
          className={classes.tagContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className={classes.tagName}>{techName}</span>
        </div>
      )}
    </div>
  );
};

export default HardProfile;
