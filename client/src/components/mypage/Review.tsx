import { FC, useState, useEffect } from "react";
import classes from "./Review.module.css";
import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";
// import NoContent from "./NoContent";
// import { authInstance } from "../../redux/utility/authInstance";

interface AuthorProps {
  authorInfo: {
    isAuthor: boolean;
    visitorId: string | null;
    ownerId: string | null;
  };
}

const dummyReview = {
  title: "프로젝트 제목 길어지면 어떻게 되는지 테스트입니다",
  project_url: "https://www.google.com",
  intro: "팀원 역할 소개 길어지면 어떻게 되는지 테스트입니다.",
  content:
    "팀원에 대한 리뷰입니다. 팀원에 대한 리뷰입니다. 얘도 길어지면 어떻게 되는지 테스트입니다.",
};

const Review: FC<AuthorProps> = ({ authorInfo }) => {
  const [showAddReview, setShowAddReview] = useState<boolean>(false);
  // const [reviewData, setReviewData] = useState<any>([]);

  const showAddReviewhandler = () => {
    setShowAddReview(!showAddReview);
  };

  const closeAddReviewHandler = () => {
    setShowAddReview(false);
  };

  // useEffect(() => {
  //   const fetchReview = async () => {
  //     try {
  //       const res = await authInstance.get(`/reviews/${authorInfo.ownerId}`);
  //       const reviewInfo = res.data.data;
  //       console.log(reviewInfo);
  //       setReviewData(reviewInfo);
  //     } catch (error) {
  //       console.error("Failed to fetch review info", error);
  //     }
  //   };
  //   fetchReview();
  // }, [authorInfo.ownerId]);
  // }, []);
  // 일단 ownerId가 변경되면 리렌더링 필요.

  return (
    <>
      <div className={classes.reviewContainer}>
        <div className={classes.titleBox}>
          <h1 className={classes.title}>
            (유저이름) 님과 프로젝트를 함께한 동료
          </h1>
          {/* 작성자가 본인의 페이지에 들어온 경우만 해당 버튼 활성화 */}
          {authorInfo.isAuthor && (
            <button className={classes.requestButton}>평가 요청하기</button>
          )}
          {/* <button className={classes.requestButton}>평가 요청하기</button> */}
        </div>
        <h2 className={classes.subtitle}>(유저이름) 님은 이런 동료입니다!</h2>
        {/* {reviewData.length === 0 ? (
          <NoContent />
        ) : (
          reviewData.map((review: any) => {
            return <ReviewCard review={review} key={review.id} />;
          })
        )} */}
        <ReviewCard review={dummyReview} />
      </div>
      <div className={classes.addReviewContainer}>
        <h2 className={classes.subtitle}>
          (유저이름) 님과 함께 프로젝트를 하신 경험이 있으신가요?
        </h2>
        {/* AddReview form 렌더링 */}
        {showAddReview ? (
          <AddReview
            onClose={closeAddReviewHandler}
            ownerId={authorInfo.ownerId}
          />
        ) : (
          <button
            className={classes.addReviewButton}
            onClick={showAddReviewhandler}
          >
            코멘트 남기기
          </button>
        )}
      </div>
    </>
  );
};
export default Review;
