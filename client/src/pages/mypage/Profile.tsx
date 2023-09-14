import { FC, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import NoContent from "../../components/mypage/NoContent";
import editicon from "../../assets/icons/edit.svg";
import Bio from "../../components/mypage/Bio";
import TitleLine from "../../components/mypage/TitleLine";
import ProfileCats from "../../components/mypage/ProfileCats";
import { useNavigate, useParams } from "react-router-dom";
import ProjCard from "../../components/mypage/ProjCard";
import SoftTag from "../../components/mypage/SoftTag";
import TechProfile from "../../components/mypage/TechProfile";
import HardProfile from "../../components/mypage/HardProfile";
import SideMenu from "../../components/mypage/Sidemenu";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAuthorInfo } from "../../redux/mypage/authorInfoSlice";
import authInstance from "../../utility/authInstance";
import { setProfile } from "../../redux/mypage/profileSlice";

interface AccessTokenType {
  id: number;
  visitorId: string;
  email: string;
  nickname: string;
}

const Profile: FC = () => {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useAppDispatch();
  const authorInfo = useAppSelector((state) => state.authorInfo);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const AT = getTokensFromLocalStorage() as AccessTokenType;
  const visitorId = AT.id.toString();
  const email = AT.nickname;
  const nickname = AT.nickname;

  useEffect(() => {
    if (AT) {
      dispatch(
        setAuthorInfo({
          isAuthor: id! === visitorId,
          visitorId: visitorId,
          ownerId: id,
          email: email,
          nickname: nickname,
        })
      );
    } else {
      // dispatch(
      //   setAuthorInfo({
      //     isAuthor: false,
      //     visitorId: "",
      //     ownerId: id,
      //     email: "",
      //     nickname: "",
      //   })
      // );
    }
  }, []);

  // get(`/mypages/profile/{id}`) : 엔드포인트
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authInstance.get(`/mypages/profile/${id}`);
        const profile = res.data;
        console.log("profile", profile);
        setProfile(profile);
        // dispatch(setProfile(res.data));
      } catch (err) {
        console.info("Error fetching profile data", err);
        // console.log(err.response);
      }
    };
    fetchProfile();
  }, []);

  const editProfileHandler = () => {
    navigate(`/mypage/${id}/edit`);
  };

  const dummyTech = {
    techTags: [
      { techName: "React", id: 1 },
      { techName: "TypeScript", id: 2 },
      { techName: "Node.js", id: 3 },
    ],
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
              {profile.coverLetter ? (
                profile.coverLetter.length > 0 ? (
                  <Bio bio={profile.coverLetter} />
                ) : (
                  <NoContent />
                )
              ) : (
                <NoContent />
              )}
            </section>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.TECH} />
              <div className={classes.techContainer}>
                {/* 일단 Tech tag 임의로 만들어 둠 */}
                <div className={classes.techContentContainer}>
                  {dummyTech.techTags.length > 0 ? (
                    dummyTech.techTags.map((techTag, index) => (
                      <TechProfile
                        key={index}
                        techName={techTag.techName}
                        id={techTag.id}
                      />
                    ))
                  ) : (
                    <NoContent />
                  )}
                </div>
                <div className={classes.helpContent}>
                  <h2 className={classes.helpTitle}>언어</h2>
                  <p className={classes.helpDesc}>
                    클릭한 기술 스택에 대한 설명이 들어갈 예정입니다. 아마도
                    gpt로 처리할 예정이구요. 이 정도만 할거에요. 이 이상은 안돼.
                  </p>
                </div>
              </div>
            </section>
            <section className={classes.profileItem}>
              <TitleLine title={ProfileCats.HARD} />
              <p className={classes.helpText}>
                마우스를 올리면 {authorInfo.nickname}님이 설정한 레벨을 볼 수
                있어요.
              </p>
              {/* <div className={classes.hardContent}> */}
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
                      <HardProfile key={index} techName={hardTag} level="A" />
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
              {/* <div className={classes.softContent}> */}
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
              <p className={classes.helpText}>
                제목을 클릭하면 프로젝트 링크로 이동합니다.
              </p>
              {/* <div className={classes.projContent}> */}
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
                      <ProjCard key={index} project={project} />
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
