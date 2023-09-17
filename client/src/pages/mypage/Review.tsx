import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Review.module.css";
import AddReview from "../../components/mypage/input/AddReview";
import ReviewCard from "../../components/mypage/view/ReviewCard";
import SideMenu from "../../components/mypage/Sidemenu";
import NoContent from "../../components/mypage/view/NoContent";
import authInstance from "../../utility/authInstance";
import { useAppSelector } from "../../redux/hooks";
import { useFetchProfile } from "../../components/mypage/useFetchProfile";

const Review: FC = () => {
  const authorInfo = useAppSelector((state) => state.authorInfo);
  const { id } = useParams<{ id: string }>();
  const [showAddReview, setShowAddReview] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<any>([]);
  const { getProfile } = useFetchProfile();

  useEffect(() => {
    if (!authorInfo.nickname) {
      getProfile(id!);
    }
  }, [authorInfo.nickname]);
  const showAddReviewhandler = () => {
    setShowAddReview(!showAddReview);
  };

  const closeAddReviewHandler = () => {
    setShowAddReview(false);
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await authInstance.get(`/mypages/reviews/${id}?page=1`);
        const reviewList = res.data.data;
        console.log(reviewList);
        setReviewData(reviewList);
      } catch (error) {
        console.error("Failed to fetch review info", error);
      }
    };
    fetchReview();
  }, []);

  return (
    <>
      <div className={classes.mainContainer}>
        <SideMenu menu="review" authorInfo={authorInfo} />
        <section className={classes.componentContainer}>
          <div className={classes.reviewContainer}>
            <div className={classes.titleBox}>
              <h1 className={classes.title}>
                {authorInfo.nickname} 님과 프로젝트를 함께한 동료
              </h1>
            </div>
            <h2 className={classes.subtitle}>
              {authorInfo.nickname} 님은 이런 동료입니다!
            </h2>
            <section className={classes.reviewCardContainer}>
              {reviewData.length === 0 ? (
                <NoContent />
              ) : (
                reviewData.map((review, index) => {
                  return <ReviewCard review={review} key={index} />;
                })
              )}
            </section>
          </div>
          <div className={classes.addReviewContainer}>
            <h2 className={classes.subtitle}>
              {authorInfo.nickname} 님과 함께 프로젝트를 하신 경험이 있으신가요?
            </h2>
            {/* AddReview form 렌더링 */}
            {showAddReview ? (
              <AddReview
                onClose={closeAddReviewHandler}
                ownerId={authorInfo.authorId}
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
        </section>
      </div>
    </>
  );
};
export default Review;
