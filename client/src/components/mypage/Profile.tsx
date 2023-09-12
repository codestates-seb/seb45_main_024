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

interface AuthorProps {
  authorInfo: {
    isAuthor: boolean;
    visitorId: string | null;
    ownerId?: string | null;
    username?: string | null;
  };
}

const Profile: FC<AuthorProps> = ({ authorInfo }) => {
  const navigate = useNavigate();

  const editProfileHandler = () => {
    navigate(`/mypage/${authorInfo.ownerId}/edit`);
  };

  const dummyBio =
    "국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 모든 국민은 종교의 자유를 가진다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다.";
  const dummyHard = {
    hardTags: [
      { techName: "English", id: 1, level: "B" },
      { techName: "Google Analytics", id: 2, level: "C" },
    ],
  };
  const dummySoft = {
    softTags: [
      { techName: "커뮤니케이션", id: 1 },
      { techName: "아유 하면할 수록 할게 나오네요", id: 2 },
      { techName: "다른 어떤 소프트 스킬이 있겠죠", id: 3 },
    ],
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
          {dummyBio.length > 0 ? <Bio bio={dummyBio} /> : <NoContent />}
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
          <div className={classes.hardContent}>
            {dummyHard.hardTags.length > 0 ? (
              dummyHard.hardTags.map((hardTag, index) => (
                <HardProfile
                  key={index}
                  techName={hardTag.techName}
                  id={hardTag.id}
                  level={hardTag.level}
                />
              ))
            ) : (
              <NoContent />
            )}
          </div>
        </section>
        <section className={classes.profileItem}>
          <TitleLine title={ProfileCats.SOFT} />
          <div className={classes.softContent}>
            {dummySoft.softTags.length > 0 ? (
              dummySoft.softTags.map((softTag, index) => (
                <SoftTag
                  key={index}
                  techName={softTag.techName}
                  id={softTag.id}
                />
              ))
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
          <div className={classes.projContent}>{/* 조건부 */}</div>
          <ProjCard />
        </section>
      </div>
    </>
  );
};

export default Profile;
