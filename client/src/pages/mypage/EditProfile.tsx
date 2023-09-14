import { FC, useState } from "react";
import classes from "./EditProfile.module.css";
import CreateProfile from "../../components/mypage/CreateProfile";
import { useNavigate, useParams } from "react-router-dom";
import authInstance from "../../utility/authInstance";

const EditProfile: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [profileFormData, setProfileFormData] = useState<any>({
    accountId: parseInt(id!),
    // coverLetter: "",
    // 이 부분은 리퀘에 없어서 일단 만들어두고 나중에 수정해야 함
    softSkills: [],
    hardSkills: [],
    projectDetails: [],
  });

  const cancelHandler = () => {
    navigate(`/mypage/${id}`);
  };

  const saveHandler = async () => {
    try {
      console.log(profileFormData);
      const response = await authInstance.patch(
        `/mypages/profile/${id}`,
        profileFormData,
      );
      console.log(response);
      window.alert("프로필이 수정되었습니다.");
      window.location.href = `/mypage/${id}`;
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <section className={classes.sideComponent}>
        <p className={classes.helpText}>
          프로필 수정을 하고 저장하기를 눌러주세요.
        </p>
        <div className={classes.actions}>
          <button className={classes.cancelBtn} onClick={cancelHandler}>
            취소
          </button>
          <button className={classes.saveBtn} onClick={saveHandler}>저장</button>
        </div>
      </section>
      <section className={classes.componentContainer}>
        <CreateProfile setProfileFormData={setProfileFormData} />
      </section>
    </div>
  );
};

export default EditProfile;
