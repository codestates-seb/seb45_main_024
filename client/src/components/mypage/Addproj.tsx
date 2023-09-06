import { FC, useState } from "react";
import classes from "./Addproj.module.css";

const Addproj: FC = () => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectLink, setProjectLink] = useState<string>("");
  const [projectImage, setProjectImage] = useState<string>("");

  const projectAddHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ProfileCreate에서 이 데이터로 참여한 프로젝트 태그 미리보기 생성 필요
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
      <div className={classes.actions}>
        <button className={classes.cancelButton}>취소</button>
        <button className={classes.submitButton}>등록하기</button>
      </div>
    </form>
  );
};
export default Addproj;
