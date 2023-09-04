import { useState } from "react";
// import classes from "./UserList.module.css";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import KewordTag from "../../components/userlist,projectlist/KewordTag";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/Card";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

const UserList = () => {
  // 섹렉트박스 예시
  const sortList = ["최신순", "조회순"];
  const positionList = ["전체", "프론트엔드", "백엔드", "디자이너"];

  // 유저 리스트 예시
  const cardList = [
    "카드1",
    "카드2",
    "카드3",
    "카드4",
    "카드5",
    "카드6",
    "카드7",
    "카드8",
    "카드9",
    "카드10",
    "카드11",
    "카드12",
  ];

  const [sortSelect, setSortSelect] = useState("최신순");
  const [positionSelect, setPositionSelect] = useState("포지션");

  const handleSortSelect = (selected: string) => {
    setSortSelect(selected);
  };

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  return (
    <>
      <ActionButton>카드 작성하기</ActionButton>
      <SearchInput placeholder="제목, 키워드 등을 검색해보세요.">
        <SearchSvg stroke="var(--color-gray-4)" />
      </SearchInput>
      <KewordTag text="포트폴리오" />
      <Selectbox
        title={sortSelect}
        options={sortList}
        selectedOption={sortSelect}
        onSelect={handleSortSelect}
      />
      <Selectbox
        title={positionSelect}
        borderRadius={4}
        options={positionList}
        selectedOption={positionSelect}
        onSelect={handlePositionSelect}
      />
      <Pagination
        totalCards={32}
        currentPage={1}
        // onChangePage={handleChangePage}
      />

      <Card type="PROJECT_CARD" />

      {cardList.map(list => (
        <Card type="USER_CARD" title={list} />
      ))}
    </>
  );
};

export default UserList;
