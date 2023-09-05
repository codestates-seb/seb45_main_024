import { FC } from "react";
import classes from "./findPassword.module.css";
// import { validationActions } from "../../redux/auth/validationSlice";
// import { useAppSelector, useAppDispatch } from "../../redux/hooks";

// interface FindPasswordData {
//   email: string;
// }

const FindPassword: FC = () => {
  return (
    <div className={classes.container}>
      <form className={classes.signUp}>
        <div className={classes.inputInfo}>
          <label>Email You Signed Up For</label>
          <input placeholder="Input Email" type="text" />
          {/* {emailError && (
            <p className={classes.errorMessage}>
              유효한 이메일 형식이 아닙니다
            </p>
          )} */}
        </div>
        <button>Send</button>
      </form>
      {/* {loading === "pending" && <p>로딩 중...</p>} */}
      {/* 얘는 모달 식으로 디자인 보완 더 필요할듯 */}
    </div>
  );
};

export default FindPassword;
