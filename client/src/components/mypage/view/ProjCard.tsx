import { FC } from "react";
import classes from "./ProjCard.module.css";
import logo_white from "../../assets/images/logo_white.png";
import { ProjectDetails } from "../../../pages/mypage/Profile";

interface ProjectProps {
  project: ProjectDetails;
}

const ProjCard: FC<ProjectProps> = props => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.projImg}>
        <img
          src={props.project.imageUrl ?? logo_white}
          alt="project thumbnail"
        />
      </div>
      <a href={props.project.projectUrl ?? "#"}>
        <span className={classes.projTitle}>{props.project.projectTitle}</span>
      </a>
    </div>
  );
};

export default ProjCard;
