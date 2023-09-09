import { FC } from "react";
import classes from "./ReviewCard.module.css";
import logo_green_face from "../../assets/images/logo_green_face.png";

// projectName, projectLink, projectImage, reviewTitle, reviewContent

const ReviewCard: FC = () => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <p className={`${classes.helpText} ${classes.createdAt}`}>CreatedAt</p>
        <p className={classes.helpText}>함께한 프로젝트</p>
        <h1 className={classes.title}>projectName</h1>
      </div>
      <div className={classes.cardAuthor}>
        <div>
          <img
            className={classes.profileImage}
            src={logo_green_face}
            alt="samepl profile image"
          />
        </div>
      </div>
      <div className={classes.cardContent}>
        <h2 className={classes.title}>reviewTitle</h2>
        <p className={`${classes.helpText} ${classes.content}`}>
          reviewContent
        </p>
      </div>
      <div className={classes.action}>
        <button type="button">더보기</button>
      </div>
    </div>
  );
};

export default ReviewCard;
