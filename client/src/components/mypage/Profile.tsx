import { FC } from "react";
import classes from "./Profile.module.css";
import NoContent from "./NoContent";
import editicon from "../../assets/icons/edit.svg";
import Bio from "./Bio";
import TitleLine from "./TitleLine";
import ProfileCats from "./ProfileCats";
import { useNavigate } from "react-router-dom";
import ProjCard from "./ProjCard";
import SoftTag from "./SoftTag";
import TechProfile from "./TechProfile";
import HardProfile from "./HardProfile";

// import commonInstance from "../../utility/authInstance";
// import axios from "axios";

interface Props {
  authorInfo: AuthorData;
  profileData: ProfileData;
}

interface AuthorData {
  isAuthor: boolean;
  visitorId: string | null;
  ownerId?: string | null;
  username?: string | null;
}

interface ProfileData {
  imageUrl: string | null;
  email: string | null;
  nickname: string | null;
  coverLetter: string | null;
  softSkills: { techName: string }[];
  hardSkills: { techName: string }[];
  projectDetails:ProjectDetails[];
}

interface ProjectDetails {
  projectTitle: string | null;
  projectUrl: string | null;
  imageUrl: string | null;
}

const Profile: FC<Props> = ({ authorInfo, profileData }) => {
  const navigate = useNavigate();

  const editProfileHandler = () => {
    navigate(`/mypage/${authorInfo.ownerId}/edit`);
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
          {profileData.coverLetter ? (
            profileData.coverLetter.length > 0 ? (
              <Bio bio={profileData.coverLetter} />
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
                클릭한 기술 스택에 대한 설명이 들어갈 예정입니다. 아마도 gpt로
                처리할 예정이구요. 이 정도만 할거에요. 이 이상은 안돼.
              </p>
            </div>
          </div>
        </section>
        <section className={classes.profileItem}>
          <TitleLine title={ProfileCats.HARD} />
          <p className={classes.helpText}>
            마우스를 올리면 {authorInfo.username}님이 설정한 레벨을 볼 수
            있어요.
          </p>
          <div
            className={
              classes.hardContent +
              (!profileData.hardSkills || profileData.hardSkills.length === 0
                ? " " + classes.centerContent
                : "")
            }
          >
            {profileData.hardSkills ? (
              profileData.hardSkills.length > 0 ? (
                profileData.hardSkills.map((hardTag, index) => (
                  <HardProfile
                    key={index}
                    techName={hardTag.techName}
                    level="A"
                  />
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
              (!profileData.softSkills || profileData.softSkills.length === 0
                ? " " + classes.centerContent
                : "")
            }
          >
            {profileData.softSkills ? (
              profileData.softSkills.length > 0 ? (
                profileData.softSkills.map((softTag, index) => (
                  <SoftTag key={index} techName={softTag.techName} />
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
          <div
            className={
              classes.projContent +
              (!profileData.projectDetails ||
              profileData.projectDetails.length === 0
                ? " " + classes.centerContent
                : "")
            }
          >
            {profileData.projectDetails ? (
              profileData.projectDetails.length > 0 ? (
                profileData.projectDetails.map((project, index) => (
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
    </>
  );
};

export default Profile;
