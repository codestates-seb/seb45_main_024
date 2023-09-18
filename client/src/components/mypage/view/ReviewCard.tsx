import { FC } from "react";
import classes from "./ReviewCard.module.css";
import DateFormat from "../format/DateFormat";

interface ReviewCardProps {
  review: {
    title: string;
    projectUrl: string;
    intro: string;
    content: string;
    createdAt: string;
    reviewerNickname: string;
    reviewerImageUrl: string;
    reviewerId: number;
  };
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <p className={`${classes.helpText} ${classes.createdAt}`}>
          <DateFormat date={review.createdAt} />
        </p>
        <div className={classes.cardHeaderContent}>
          <div className={classes.cardHeaderText}>
            <p className={classes.helpText}>함께한 프로젝트</p>
            <h1 className={classes.title}>{review.title}</h1>
          </div>
          <div className={classes.cardAuthor}>
            <div className={classes.profileImageContainer}>
              <a href={`/mypage/${review.reviewerId}`}>
                <img
                  title={review.reviewerNickname}
                  className={classes.profileImage}
                  src={review.reviewerImageUrl}
                  // 이미지 테스트
                  // src="https://images.unsplash.com/photo-1642953702322-a5da05d2e36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                  alt="sample profile image"
                />
              </a>
            </div>
          </div>
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
        <a href={review.projectUrl}>
          <span>프로젝트로 이동하기</span>
        </a>
      </div>
    </div>
  );
};

export default ReviewCard;
