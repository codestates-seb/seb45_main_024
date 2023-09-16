import { FC } from "react";
import classes from "./Bio.module.css";

// get 요청해서 받아온 bio 정보 렌더링
// props로 내려도 될 듯
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
