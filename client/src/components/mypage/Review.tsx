import { FC } from "react";
import classes from "./Review.module.css";
import AddReview from "./AddReview";

const Review: FC = () => {
  return (
    <>
      <div className={classes.reviewContainer}>
        <div className={classes.titleBox}>
          <h1 className={classes.title}>
            (유저이름) 님과 프로젝트를 함께한 동료
          </h1>
          {/* 작성자가 본인의 페이지에 들어온 경우만 해당 버튼 활성화 */}
          <button className={classes.requestButton}>평가 요청하기</button>
        </div>
        <h2 className={classes.subtitle}>(유저이름) 님은 이런 동료입니다!</h2>
        <div>해당 유저가 가진 동료 리뷰 카드 렌더링/ 없을 때 조건부 렌더링</div>
      </div>
      <div className={classes.addReviewContainer}>
        <h2 className={classes.subtitle}>
          (유저이름) 님과 함께 프로젝트를 하신 경험이 있으신가요?
        </h2>
        <button className={classes.addReviewButton}>코멘트 남기기</button>
        {/* AddReview form 렌더링 */}
        <AddReview />
      </div>
    </>
  );
};
export default Review;
