import { FC } from "react";
import classes from "./EditMyInfo.module.css";

const EditMyInfo: FC = () => {
  return (
    <>
      {/* 프로필 이미지, 닉네임, 패스워드, 프로필정보 변경할 수 있는 버튼, 회원탈퇴 버튼 */}
      <div className={classes.infoHeaderBox}>
        <h1 className={classes.headerTitle}>나의 정보</h1>
        <p className={classes.helptext}>회원가입 시에 입력하신 정보입니다.</p>
        <p className={classes.helptext}>
          개인 정보 보호를 위해서 비밀번호 재발급 시에 비밀번호를 변경해주세요.
        </p>
      </div>
      <div className={classes.infoContentBox}>
        <h2 className={classes.contentTitle}>개인정보</h2>
        <div className={classes.infoContent}>
          <div className={classes.myImg}>(프로필 이미지)</div>
          <p className={classes.userNickname}>닉네임</p>
          <p className={classes.myNickname}>(유저 이름)</p>
          <p className={classes.userEmail}>가입 이메일</p>
          <p className={classes.myEmail}>(유저 이메일)</p>
          <p className={classes.userPw}>비밀번호</p>
          <p className={classes.myPw}>
            (유저 비밀번호 앞에 4개만 보이고 나머진 *로 표시)
          </p>
        </div>
        <div className={classes.profileBox}>
          <h2 className={classes.contentTitle}>프로필</h2>
          <button>프로필 수정하기</button>
        </div>
      </div>
    </>
  );
};

export default EditMyInfo;
