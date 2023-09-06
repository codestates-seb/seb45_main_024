import { FC, useState } from "react";
import classes from "./MyInfo.module.css";
import EditInfo from "./EditInfo";
import TitleLine from "./TitleLine";
import ProfileCats from "./ProfileCats";
import NoContent from "./NoContent";

const MyInfo: FC = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const showEditFormhandler = () => {
    setShowEditForm(!showEditForm);
  };

  const closeEditFormHandler = () => {
    setShowEditForm(false);
  };
  return (
    <>
      {/* 프로필 이미지, 닉네임, 패스워드, 프로필정보 변경할 수 있는 버튼, 회원탈퇴 버튼 */}
      <section className={classes.infoHeaderBox}>
        <h1 className={classes.headerTitle}>나의 정보</h1>
        <p className={classes.helptext}>회원가입 시에 입력하신 정보입니다.</p>
        <p className={`${classes.helptext} ${classes.warning}`}>
          개인 정보 보호를 위해서 비밀번호 재발급 시에 비밀번호를 변경해주세요.
        </p>
      </section>
      <section className={classes.infoContentBox}>
        <div className={classes.infoContentHeader}>
          <h2 className={classes.contentTitle}>회원정보</h2>
          {!showEditForm && (
            <button className={classes.editInfo} onClick={showEditFormhandler}>
              회원정보 변경
            </button>
          )}
        </div>
        {showEditForm ? (
          <EditInfo onClose={closeEditFormHandler} />
        ) : (
          <div className={classes.infoContent}>
            <div className={classes.profileImgContainer}>
              <img
                className={classes.profileimage}
                src="https://images.unsplash.com/photo-1682687980976-fec0915c6177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                alt="sampleProfile"
              />
            </div>
            <div className={classes.infoitems}>
              <div className={classes.infoitem}>
                <p className={classes.fieldname}>닉네임</p>
                <p className={classes.fieldvalue}>(유저 이름)</p>
              </div>
              <div className={classes.infoitem}>
                <p className={classes.fieldname}>가입 이메일</p>
                <p className={classes.fieldvalue}>(유저 이메일)</p>
              </div>
              <div className={classes.infoitem}>
                <p className={classes.fieldname}>비밀번호</p>
                <p className={`${classes.fieldvalue} ${classes.password}`}>
                  (samplepassword)
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className={classes.profileBox}>
        <h2 className={classes.contentTitle}>프로필</h2>
        <div className={classes.profileContainer}>
          <div className={classes.profilepreview}>
            <div className={classes.profileContent}>
              <TitleLine title={ProfileCats.BIO} />
              <NoContent />
            </div>
          </div>
          <div className={classes.overlay}>
            <button className={classes.editProfile}>프로필 수정하기</button>
            {/* 라우팅 변경 */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyInfo;
