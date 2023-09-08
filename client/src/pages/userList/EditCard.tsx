import CardEditor from "../../components/userlist/CardEditor";

const EditCard = () => {
  // 기존 데이터를 가져와야 함. 아래는 예시
  const originCard = {
    teamBoardId: 2,
    title: "취업용 포트폴리오 함께 작업할 백엔드 팀원 구합니다.",
    position: "백엔드",
    keywords: ["포트폴리오", "사이드프로젝트"],
    accountId: 2,
    createdAt: "2023-09-02T19:42:19",
    modifiedAt: "2023-09-02T19:42:19",
  };
  return (
    <>
      <CardEditor type="EDIT_CARD" originCard={originCard} />
    </>
  );
};

export default EditCard;
