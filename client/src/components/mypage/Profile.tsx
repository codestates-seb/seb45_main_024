import { FC } from "react";

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
      <div>
        <div>
          <h1>저는 이런 사람이에요.</h1>
          <section>{/* 조건부 */}</section>
        </div>
        <div>
          <h1>기술 스택</h1>
          <section>{/* 조건부 */}</section>
          <div>
            <h2>언어</h2>
            <p>설명</p>
          </div>
        </div>
        <div>
          <h1>하드 스킬</h1>
          <section>{/* 조건부 */}</section>
        </div>
        <div>
          <h1>소프트 스킬</h1>
          <section>{/* 조건부 */}</section>
        </div>
        <div>
          <h1>참여한 프로젝트</h1>
          <section>{/* 조건부 */}</section>
        </div>
      </div>
    </>
  );
};

export default Profile;
