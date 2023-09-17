import { FC, useState, useEffect } from "react";
import classes from "./MyInfo.module.css";
import EditInfo from "../../components/mypage/input/EditInfo";
import TitleLine from "../../components/mypage/view/TitleLine";
import ProfileCats from "../../components/mypage/format/ProfileCats";
import NoContent from "../../components/mypage/view/NoContent";
import authInstance from "../../utility/authInstance";
import { useNavigate, useParams } from "react-router-dom";
import SideMenu from "../../components/mypage/Sidemenu";
import { useAppSelector } from "../../redux/hooks";
import { removeTokensFromLocalStorage } from "../../utility/tokenStorage";
import default_profile from "../../assets/images/default_profile.svg";
import { ProfileState } from "../../redux/mypage/profileSlice";
import TagRemover from "../../components/mypage/format/TagRemover";
import { useFetchProfile } from "../../components/mypage/useFetchProfile";

const MyInfo: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const authorInfo = useAppSelector(state => state.authorInfo);
  const { profileData } = useAppSelector(
    (state: { profile: ProfileState }) => state.profile,
  );

  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const { getProfile } = useFetchProfile();
  useEffect(() => {
    if (!authorInfo.nickname) {
      getProfile(id!);
    }
  }, [authorInfo.nickname]);

  const showEditFormhandler = () => {
    setShowEditForm(!showEditForm);
  };

  const closeEditFormHandler = () => {
    setShowEditForm(false);
  };

  const editProfileHandler = () => {
    navigate(`/mypage/${id}/edit`);
  };

  const deleteAccountHandler = async () => {
    const confirmation = window.confirm(
      "정말 회원탈퇴를 하시겠습니까? 모든 정보가 사라져요.",
    );

    if (confirmation) {
      try {
        authInstance
          .delete(`/accounts/${id}`)
          .then(res => {
            alert("회원탈퇴가 완료되었습니다.");
          })
          .then(res => {
            removeTokensFromLocalStorage();
          })
          .then(res => {
            authInstance.post("/accounts/logout");
          })
          .then(res => {
            window.location.href = "/signup";
          });
      } catch (error) {
        console.info("Failed to delete account", error);
      }
    }
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <SideMenu menu="myInfo" authorInfo={authorInfo} />
        <section className={classes.componentContainer}>
          <section className={classes.infoHeaderBox}>
            <h1 className={classes.headerTitle}>나의 정보</h1>
            <p className={classes.helptext}>
              회원가입 시에 입력하신 정보입니다.
            </p>
            <p className={`${classes.helptext} ${classes.warning}`}>
              개인 정보 보호를 위해서 비밀번호 재발급 시에 비밀번호를
              변경해주세요.
            </p>
          </section>
          <section className={classes.infoContentBox}>
            <div className={classes.infoContentHeader}>
              <h2 className={classes.contentTitle}>회원정보</h2>
              <div className={classes.actions}>
                {!showEditForm && (
                  <button
                    className={classes.editInfo}
                    onClick={showEditFormhandler}
                  >
                    회원정보 변경
                  </button>
                )}
                <button
                  className={`${classes.editInfo} ${classes.deleteProfile}`}
                  onClick={deleteAccountHandler}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
            {showEditForm ? (
              <EditInfo onClose={closeEditFormHandler} />
            ) : (
              <div className={classes.infoContent}>
                <div className={classes.profileImgContainer}>
                  <img
                    className={classes.profileimage}
                    // src={authorInfo.imgUrl} -> 아직 제대로 안 들어감
                    src={default_profile}
                    alt="sampleProfile"
                  />
                </div>
                <div className={classes.infoitems}>
                  <div className={classes.infoitem}>
                    <p className={classes.fieldname}>닉네임</p>
                    <p className={classes.fieldvalue}>{authorInfo.nickname}</p>
                  </div>
                  <div className={classes.infoitem}>
                    <p className={classes.fieldname}>가입 이메일</p>
                    <p className={classes.fieldvalue}>{authorInfo.email}</p>
                  </div>
                  <div className={classes.infoitem}>
                    <p className={classes.fieldname}>비밀번호</p>
                    <p className={`${classes.fieldvalue} ${classes.password}`}>
                      (변경하세요)
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
                  <div className={classes.bioContainer}>
                    {profileData?.coverLetter ? (
                      profileData.coverLetter.length > 0 ? (
                        <TagRemover content={profileData.coverLetter} />
                      ) : (
                        <NoContent />
                      )
                    ) : (
                      <NoContent />
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.overlay}>
                <button
                  className={classes.editProfile}
                  onClick={editProfileHandler}
                >
                  프로필 수정하기
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default MyInfo;
