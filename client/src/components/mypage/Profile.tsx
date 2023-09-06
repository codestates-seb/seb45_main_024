import { FC } from "react";
import CreateProfile from "./CreateProfile";
import classes from "./Profile.module.css";
import NoContent from "./NoContent";

// 컴포넌트 구분 없이 작업 후 분리 예정

const Profile: FC = () => {
  // TODO: edit 버튼 클릭 시에 edit 모드로 변경
  // 아무것도 없을 때 렌더링 조건 추가 및 수정 버튼 만들기
  // api get 요청으로 프로필 정보 받아오기
  // 프로필 정보 + 기술 스택 설명

  return (
    <>
      <div>
        <a>{/*edit*/}</a>
      </div>
      <div className={classes.profileItemsContainer}>
        <section className={classes.profileItem}>
          <div className={classes.titleline}>
            <h1 className={classes.title}>저는 이런 사람이에요.</h1>
          </div>
          <div>테스트</div>
          <NoContent />
        </section>
        <section>
          <div className={classes.titleline}>
            <h1 className={classes.title}>기술 스택</h1>
          </div>
          <div>{/* 조건부 */}</div>
          <div>
            <h2>언어</h2>
            <p>설명</p>
          </div>
        </section>
        <section>
          <div className={classes.titleline}>
            <h1 className={classes.title}>하드 스킬</h1>
          </div>
          <div>{/* 조건부 */}</div>
        </section>
        <section>
          <div className={classes.titleline}>
            <h1 className={classes.title}>소프트 스킬</h1>
          </div>
          <div>{/* 조건부 */}</div>
        </section>
        <section>
          <div className={classes.titleline}>
            <h1 className={classes.title}>참여한 프로젝트</h1>
          </div>
          <div>{/* 조건부 */}</div>
        </section>
      </div>
      <h1 style={{ marginTop: "6rem" }}>Edit 눌렀을 때</h1>
      <CreateProfile />
    </>
  );
};

export default Profile;
