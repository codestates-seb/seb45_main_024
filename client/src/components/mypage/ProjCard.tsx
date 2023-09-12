import { FC } from "react";
import classes from "./ProjCard.module.css";
import logo_white from "../../assets/images/logo_white.png";

const ProjCard: FC = () => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.projImg}>
        <img src={logo_white} alt="project thumbnail" />
      </div>
      <a href="#">
        <span className={classes.projTitle}>프로젝트 제목</span>
      </a>
    </div>
  );
};

export default ProjCard;
