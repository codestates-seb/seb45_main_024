import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/Card";
import Checkbox from "../../components/userlist,projectlist/Checkbox";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import classes from "./ProjectList.module.css";

const ProjectList = () => {
  const navigate = useNavigate();

  // 섹렉트박스 예시
  const sortList = ["최신순", "조회순"];
  const stackList = ["기술스택1", "기술스택2"];
  const positionList = ["전체", "프론트엔드", "백엔드", "디자이너"];

  // 프로젝트 리스트 예시
  const cardList = [
    "카드1",
    "카드2",
    "카드3",
    "카드4",
    "카드5",
    "카드6",
    "카드7",
    "카드8",
    // "카드9",
    // "카드10",
    // "카드11",
    // "카드12",
  ];

  const [sortSelect, setSortSelect] = useState("최신순");
  const [stackSelect, setStackSelect] = useState("기술스택");
  const [positionSelect, setPositionSelect] = useState("포지션");

  const handleSortSelect = (selected: string) => {
    setSortSelect(selected);
  };

  const handleStackSelect = (selected: string) => {
    setStackSelect(selected);
  };

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  const handleClick = () => {
    navigate("/projectlist/write");
  };

  return (
    <main>
      <div className={classes.buttonArea}>
        <ActionButton handleClick={handleClick}>카드 작성하기</ActionButton>
      </div>
      <div className={classes.searchArea}>
        <Selectbox
          title={sortSelect}
          options={sortList}
          selectedOption={sortSelect}
          onSelect={handleSortSelect}
        />
        <Selectbox
          title={stackSelect}
          options={stackList}
          selectedOption={stackSelect}
          onSelect={handleStackSelect}
        />
        <Selectbox
          title={positionSelect}
          options={positionList}
          selectedOption={positionSelect}
          onSelect={handlePositionSelect}
        />
        <Checkbox title="recruit" text="모집중만 보기" />
        <SearchInput placeholder="제목, 키워드 등을 검색해보세요.">
          <SearchSvg stroke="var(--color-gray-4)" />
        </SearchInput>
      </div>

      <ul className={classes.cardListArea}>
        {cardList.map(list => (
          <Card type="PROJECT_CARD" title={list} />
        ))}
      </ul>

      <div className={classes.pagination}>
        <Pagination
          totalCards={32}
          currentPage={1}
          // onChangePage={}
        />
      </div>
    </main>
  );
};

export default ProjectList;
