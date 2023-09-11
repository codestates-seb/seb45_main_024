import { FC } from "react";
import classes from "./ReviewCard.module.css";
import logo_green_face from "../../assets/images/logo_green_face.png";

// projectName, projectLink, projectImage, reviewTitle, reviewContent
interface ReviewCardProps {
  review: {
    title: string;
    project_url: string;
    intro: string;
    content: string;
    // id?: number; -> 확인 필요
    // createdAt?: string; -> 확인 필요
  };
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <p className={`${classes.helpText} ${classes.createdAt}`}>CreatedAt</p>
        <p className={classes.helpText}>함께한 프로젝트</p>
        <h1 className={classes.title}>{review.title}</h1>
      </div>
      <div className={classes.cardAuthor}>
        <div className={classes.profileImageContainer}>
          <img
            className={classes.profileImage}
            src={logo_green_face}
            alt="sample profile image"
          />
        </div>
      </div>
      <div className={classes.cardContent}>
        <h2 className={`${classes.title} ${classes.content}`}>
          {review.intro}
        </h2>
        <p className={`${classes.helpText} ${classes.content}`}>
          {review.content}
        </p>
      </div>
      <div className={classes.action}>
        <a href={review.project_url}>
          <span>프로젝트로 이동하기</span>
        </a>
      </div>
    </div>
  );
};

export default ReviewCard;
