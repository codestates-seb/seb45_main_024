import { FC } from "react";
import classes from "./EditInfo.module.css";

// 회원정보 수정 클릭하면 기존 회원정보가지고 와서 placeholder로 넣어주기
// 저장하기 버튼 누르면 회원정보 수정되고 다시 MyInfo로 라우팅

const EditInfo: FC = () => {
  return (
    <div className={classes.editformContainer}>
      <form className={classes.editform}>
        <div className={classes.edititem}>
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" />
        </div>
        <div className={classes.edititem}>
          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" type="text" placeholder="기존 닉네임" />
        </div>
        <div className={classes.edititem}>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="text" placeholder="기존 비번" />
        </div>
        <div className={classes.actions}>
          <button className={classes.button}>취소</button>
          <button className={`${classes.button} ${classes.save}`}>
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
