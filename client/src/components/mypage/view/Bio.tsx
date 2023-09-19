import { FC } from "react";
import classes from "./Bio.module.css";

interface bioProps {
  bio: string;
}

const Bio: FC<bioProps> = ({ bio }) => {
  return (
    <div className={classes.bioContainer}>
      <p className={classes.bioContent}>{bio}</p>
    </div>
  );
};

export default Bio;
