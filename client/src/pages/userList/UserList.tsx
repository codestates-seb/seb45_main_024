import { useState } from "react";
// import classes from "./UserList.module.css";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import KewordTag from "../../components/userlist,projectlist/KewordTag";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

const UserList = () => {
  // 섹렉트박스 예시
  const sortList = ["최신순", "조회순"];
  const positionList = ["전체", "프론트엔드", "백엔드", "디자이너"];

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
    </>
  );
};

export default UserList;
