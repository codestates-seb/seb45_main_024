import { FC } from "react";
import classes from "./Addproj.module.css";

interface AddprojProps {
  projectName: string;
  projectLink: string;
  projectImage: string;
  projTags: string[];
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setProjectLink: React.Dispatch<React.SetStateAction<string>>;
  setProjectImage: React.Dispatch<React.SetStateAction<string>>;
  setProjTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Addproj: FC<AddprojProps> = ({
  projectName,
  projectLink,
  projectImage,
  setProjectName,
  setProjectLink,
  setProjectImage,
  projTags,
  setProjTags,
}) => {
  // 아직 추가안 함.
  // const projectAddHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // ProfileCreate에서 이 데이터로 참여한 프로젝트 태그 미리보기 생성 필요
  //   // 굳이 툴킷? 이 정도면 위로 올려도 될 듯
  // };

  const addProjTagHandler = () => {
    if (projectName.length > 0) {
      setProjTags([...projTags, projectName]);
      setProjectName("");
      setProjectLink("");
      setProjectImage("");
    }
  };

  return (
    <form className={classes.projectForm}>
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
          onChange={(e) => setProjectName(e.target.value)}
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
          onChange={(e) => setProjectLink(e.target.value)}
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
          onChange={(e) => setProjectImage(e.target.value)}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes.cancelButton}>취소</button>
        <button
          type="button"
          className={classes.submitButton}
          onClick={addProjTagHandler}
        >
          등록하기
        </button>
      </div>
    </form>
  );
};
export default Addproj;
