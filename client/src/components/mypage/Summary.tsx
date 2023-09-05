import { FC } from "react";
import Addproj from "./Addproj";
import classes from "./Summary.module.css";

const Summary: FC = () => {
  return (
    <>
      <div className={`${classes.cardContainer} ${classes.userlist}`}>
        <div className={classes.titleBox}>
          <h1 className={classes.title}>저는 이런 프로젝트를 찾고 있어요.</h1>
          <button className={classes.deleteButton}>Delete</button>
        </div>
        <div>해당 유저가 작성한 팀찾기 카드 렌더링</div>
      </div>
      <div className={`${classes.cardContainer} ${classes.projlist}`}>
        <div className={classes.titleBox}>
          <h1 className={classes.title}>저는 이런 프로젝트를 기획했어요.</h1>
          <button className={classes.deleteButton}>Delete</button>
        </div>
        <div>해당 유저가 작성한 팀원찾기 카드 렌더링</div>
      </div>
    </>
  );
};

export default Summary;
