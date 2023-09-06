import { FC, useState } from "react";
import classes from "./AddReview.module.css";

interface AddReviewProps {
  onClose: () => void;
}

const AddReview: FC<AddReviewProps> = ({ onClose }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectLink, setProjectLink] = useState<string>("");
  const [projectImage, setProjectImage] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [reviewContent, setReviewContent] = useState<string>("");

  const projectAddHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 굳이 툴킷? 이 정도면 위로 올려도 될 듯
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
      <div className={classes.formGroup}>
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
      </div>
      <div className={`${classes.formGroup} ${classes.review}`}>
        <div className={classes.formSubGroup}>
          <label className={classes.formLabel} htmlFor="reviewTitle">
            (유저이름) 님의 역할은 무엇이었나요?
          </label>
          <p className={classes.formHint}>
            프로젝트에서 (유저이름)님의 활약을 한 줄로 소개한다면?
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
