import { FC, useState } from "react";
import classes from "./AddReview.module.css";
import authInstance from "../../utility/authInstance";
import { useParams , useNavigate} from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface AddReviewProps {
  onClose: () => void;
}

const AddReview: FC<AddReviewProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const authorInfo = useAppSelector(state => state.authorInfo);
  const { id } = useParams<{ id: string }>();
  const [projectName, setProjectName] = useState<string>("");
  const [projectLink, setProjectLink] = useState<string>("");
  // const [projectImage, setProjectImage] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewContent, setReviewContent] = useState<string>("");

  const projectAddHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const reviewFormData = {
        title: projectName,
        project_url: projectLink,
        intro: reviewTitle,
        content: reviewContent,
      };

      await authInstance.post(`/reviews/${id}`, reviewFormData);
      window.alert("리뷰가 등록되었습니다.");
      navigate(-1);
      // profile로 감. 
      // window.location.href = `/mypage/${id}/review`;
    } catch (err) {
      console.error("Failed to add review", err);
      window.alert("리뷰 등록에 실패했습니다.");
      window.location.href = `/mypage/${id}/review`;
    }
  };

  return (
    <form className={classes.projectForm} onSubmit={projectAddHandler}>
      <div className={classes.formGroup}>
        <label className={classes.formLabel} htmlFor="projectName">
          프로젝트 명
        </label>
        <input
          className={classes.formInput}
          id="projectName"
          type="text"
          value={projectName}
          placeholder="이름을 입력해주세요"
          onChange={e => setProjectName(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <div className={classes.formSubGroup}>
          <label className={classes.formLabel} htmlFor="projectLink">
            프로젝트 링크
          </label>
          <p className={classes.formHint}>깃허브 링크를 권장합니다.</p>
        </div>
        <input
          className={classes.formInput}
          id="projectLink"
          type="url"
          value={projectLink}
          onChange={e => setProjectLink(e.target.value)}
        />
      </div>
      {/* <div className={classes.formGroup}>
        <div className={classes.formSubGroup}>
          <label className={classes.formLabel} htmlFor="projectImage">
            관련 이미지가 있나요?
          </label>
          <p className={classes.formHint}>해당 이미지는 썸네일로 활용됩니다.</p>
        </div>
        <input
          className={classes.formInput}
          id="projectImage"
          type="file"
          value={projectImage}
          onChange={e => setProjectImage(e.target.value)}
        />
      </div> */}
      <div className={`${classes.formGroup} ${classes.review}`}>
        <div className={classes.formSubGroup}>
          <label className={classes.formLabel} htmlFor="reviewTitle">
            {authorInfo.username} 님의 역할은 무엇이었나요?
          </label>
          <p className={classes.formHint}>
            프로젝트에서 {authorInfo.username}님의 활약을 한 줄로 소개한다면?
          </p>
        </div>
        <input
          className={classes.formInput}
          id="reviewTitle"
          type="text"
          value={reviewTitle}
          onChange={e => setReviewTitle(e.target.value)}
        />
      </div>
      <div className={`${classes.formGroup} ${classes.review}`}>
        <div className={classes.formSubGroup}>
          <label
            className={`${classes.formHint} ${classes.warning}`}
            htmlFor="reviewTitle"
          >
            욕설과 비방이 담긴 리뷰는 게재되지 않으며, 상대방에게도 보이지
            않습니다.
          </label>
        </div>
        <textarea
          className={classes.formInput}
          id="reviewTitle"
          rows={3}
          placeholder="나와 프로젝트를 함께한 동료를 더 자세히 소개해주세요:)"
          value={reviewContent}
          onChange={e => setReviewContent(e.target.value)}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes.cancelButton} onClick={onClose}>
          취소
        </button>
        <button className={classes.submitButton}>코멘트 남기기</button>
      </div>
    </form>
  );
};
export default AddReview;
