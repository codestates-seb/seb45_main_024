import { FC } from "react";
import classes from "./EditProfile.module.css";
import CreateProfile from "../../components/mypage/CreateProfile";
import { useNavigate } from "react-router-dom";

const EditProfile: FC = () => {
  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate("/mypage/1");
    // navigate("/mypage/:UserId");
  };

  return (
    <div className={classes.mainContainer}>
      <section className={classes.sideComponent}>
        <p className={classes.helpText}>
          아무거나 넣어봤어요. 일단 여기 옆에 프로필 수정을 하고 저장하기를
          눌러주세요.
        </p>
        <div className={classes.actions}>
          <button className={classes.cancelBtn} onClick={cancelHandler}>
            취소
          </button>
          <button className={classes.saveBtn}>저장</button>
        </div>
      </section>
      <section className={classes.componentContainer}>
        <CreateProfile />
      </section>
    </div>
  );
};

export default EditProfile;
