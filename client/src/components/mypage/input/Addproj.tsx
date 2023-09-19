import { FC } from "react";
import classes from "./Addproj.module.css";
import authInstance from "../../../utility/authInstance";

interface AddprojProps {
  projectName: string;
  projectLink: string;
  projectImage: string;
  projTags: string[];
  projSet: object[];
  projectId: number;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectId: React.Dispatch<React.SetStateAction<number>>;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setProjectLink: React.Dispatch<React.SetStateAction<string>>;
  setProjectImage: React.Dispatch<React.SetStateAction<string>>;
  setProjTags: React.Dispatch<React.SetStateAction<string[]>>;
  setProjSet: React.Dispatch<React.SetStateAction<object[]>>;
}

const Addproj: FC<AddprojProps> = ({
  projectName,
  projectLink,
  projectImage,
  projSet,
  // projectId,
  setShowInput,
  setProjectId,
  setProjectName,
  setProjectLink,
  setProjectImage,
  setProjSet,
  projTags,
  setProjTags,
}) => {
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const projectDetails = {
      projectTitle: projectName,
      projectUrl: projectLink,
      uploadImage: {
        imageName: projectName,
        imageUrl: projectImage,
      },
    };
    try {
      const response = await authInstance.post(
        `/mypages/profile/projectDetails`,
        projectDetails
      );
      const projectId = response.data.projectDetailId;
      setProjectId(projectId);
      projSet.push({
        projectId: projectId,
        projectTitle: projectName,
      });
      setProjSet(projSet);
    } catch (err) {
      console.info("Error submitting project", err);
    }
  };

  const addProjTagHandler = () => {
    if (projectName.length > 0) {
      setProjTags([...projTags, projectName]);
      setProjectName(projectName);
      setProjectLink(projectLink);
      setProjectImage(projectImage);
    }
  };
  const closeInputHandler = () => {
    setShowInput(false);
  };

  return (
    <form className={classes.projectForm} onSubmit={handleSumbit}>
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
        <button className={classes.cancelButton} onClick={closeInputHandler}>취소</button>
        <button
          type="submit"
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
