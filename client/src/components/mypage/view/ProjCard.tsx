import { FC } from "react";
import classes from "./ProjCard.module.css";
import logo_white from "../../../assets/images/logo_white.png";

interface ProjectDetails {
  projectTitle: string;
  imageUrl: string;
  projectUrl: string;
}

interface ProjectProps {
  project: ProjectDetails;
}

const ProjCard: FC<ProjectProps> = props => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.projImg}>
        <img
          src={props.project.imageUrl ?? logo_white}
          // src="https://images.unsplash.com/photo-1621502863666-e47e3bd2547b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
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
