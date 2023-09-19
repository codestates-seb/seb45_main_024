import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import editicon from "../../assets/icons/edit.svg";
import NoContent from "../../components/mypage/view/NoContent";
import TagRemover from "../../components/mypage/format/TagRemover";
import TitleLine from "../../components/mypage/view/TitleLine";
import ProfileCats from "../../components/mypage/format/ProfileCats";
import ProjCard from "../../components/mypage/view/ProjCard";
import SoftTag from "../../components/mypage/tag/SoftTag";
import TechProfile from "../../components/mypage/view/TechProfile";
import SideMenu from "../../components/mypage/Sidemenu";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAuthorInfo } from "../../redux/mypage/authorInfoSlice";
import authInstance from "../../utility/authInstance";
import { setProfileData } from "../../redux/mypage/profileSlice";
import { TechDesc } from "../../components/mypage/format/TechDesc";
import GetLogo from "../../components/mypage/format/GetLogo";
// import default_profile from "../../assets/images/default_profile.png";

interface AccessTokenType {
  id: number;
  visitorId: string;
  username: string;
  nickname: string;
}

const Profile: FC = () => {
  const [desc, setDesc] = useState<string>("");
  const [selectedTechName, setSelectedTechName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>({});
  const authorInfo = useAppSelector((state) => state.authorInfo);
  const [isDelete, setIsDelete] = useState(false);
  const { id } = useParams<{ id: string }>();
  const AT = getTokensFromLocalStorage() as AccessTokenType;
  const visitorId = AT.id.toString();

  const onDeleteHandler = () => {
    setIsDelete(!isDelete);
  };

  const projDeleteHandler = async (id: number) => {
    try {
      const response = await authInstance.delete(
        `/mypages/profile/projectDetails/${id}`,
      );
      console.log(response);
      window.alert('프로젝트가 삭제되었습니다.');
      window.location.reload();
    } catch (err) {
      console.info("Error deleting project", err);
    }
  };

  const onTechProfileClick = (techName: string) => {
    setSelectedTechName(techName);
    setDesc(TechDesc[techName]);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authInstance.get(`/mypages/profile/${id}`);
        const profile = res.data;
        console.log(profile);
        setProfile(profile);
        dispatch(setProfileData(res.data));
        dispatch(
          setAuthorInfo({
            isAuthor: id! === visitorId,
            authorId: id,
            email: profile.email,
            nickname: profile.nickname,
            imgUrl: profile.imageUrl,
          })
        );
      } catch (err) {
        console.info("Error fetching profile data", err);
      }
    };
    fetchProfile();
  }, []);

  const editProfileHandler = () => {
    navigate(`/mypage/${id}/edit`);
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <SideMenu menu="profile" authorInfo={authorInfo} />
        <section className={classes.componentContainer}>
          <div className={classes.editContainer}>
            {authorInfo.isAuthor && (
              <img
                className={classes.editButton}
                src={editicon}
                alt="edit icon"
                onClick={editProfileHandler}
              />
            )}
          </div>
          <div className={classes.profileItemsContainer}>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.BIO} />
              <div className={classes.bioContainer}>
                {profile.coverLetter ? (
                  profile.coverLetter.length > 0 ? (
                    <TagRemover content={profile.coverLetter} />
                  ) : (
                    <NoContent />
                  )
                ) : (
                  <NoContent />
                )}
              </div>
            </section>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.TECH} />
              <div className={classes.techContainer}>
                <div className={classes.techContentContainer}>
                  {profile.techTags ? (
                    profile.techTags.map((techTag, index) => (
                      <TechProfile
                        key={techTag.id}
                        techName={techTag.techName}
                        id={techTag.id}
                        onClick={() => onTechProfileClick(techTag.techName)}
                      />
                    ))
                  ) : (
                    <NoContent />
                  )}
                </div>
                <div className={classes.helpContent}>
                  <div className={classes.helpHeader}>
                    <h2 className={classes.helpTitle}>{selectedTechName}</h2>
                    <div className={classes.logoImg}>
                      <GetLogo logoTitle={selectedTechName} />
                    </div>
                  </div>
                  <p className={classes.helpDesc}>
                    {desc ? desc : "기술을 선택해주세요."}
                  </p>
                </div>
              </div>
            </section>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.HARD} />
              <div
                className={
                  classes.hardContent +
                  (!profile.hardSkills || profile.hardSkills.length === 0
                    ? " " + classes.centerContent
                    : "")
                }
              >
                {profile.hardSkills ? (
                  profile.hardSkills.length > 0 ? (
                    profile.hardSkills.map((hardTag, index) => (
                      <SoftTag key={index} techName={hardTag} />
                    ))
                  ) : (
                    <NoContent />
                  )
                ) : (
                  <NoContent />
                )}
              </div>
            </section>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.SOFT} />
              <div
                className={
                  classes.softContent +
                  (!profile.softSkills || profile.softSkills.length === 0
                    ? " " + classes.centerContent
                    : "")
                }
              >
                {profile.softSkills ? (
                  profile.softSkills.length > 0 ? (
                    profile.softSkills.map((softTag, index) => (
                      <SoftTag key={index} techName={softTag} />
                    ))
                  ) : (
                    <NoContent />
                  )
                ) : (
                  <NoContent />
                )}
              </div>
            </section>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.PROJ} />
              <div className={classes.projSubContainer}>
                <p className={classes.helpText}>
                  {isDelete ? "삭제할 카드를 클릭해주세요." : "제목을 클릭하면 프로젝트 링크로 이동합니다."}
                </p>
                {authorInfo.isAuthor && (
                  <button className={classes.deleteButton} onClick={onDeleteHandler}>{isDelete ? "Done" : "Delete"}</button>)
                  }
              </div>
              <div
                className={
                  classes.projContent +
                  (!profile.projectDetails ||
                  profile.projectDetails.length === 0
                    ? " " + classes.centerContent
                    : "")
                }
              >
                {profile.projectDetails ? (
                  profile.projectDetails.length > 0 ? (
                    profile.projectDetails.map((project, index) => (
                      <ProjCard key={index} projectDetail={project} remove={isDelete} onClick={projDeleteHandler} />
                    ))
                  ) : (
                    <NoContent />
                  )
                ) : (
                  <NoContent />
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
