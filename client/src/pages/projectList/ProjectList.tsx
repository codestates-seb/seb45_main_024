import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/card/Card";
import Checkbox from "../../components/userlist,projectlist/Checkbox";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

import { fetchProjectList } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./ProjectList.module.css";

const ProjectList = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const projectListData = useAppSelector(state => state.projects.data);
  console.log("✅ PROJECT LIST", projectListData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // 섹렉트박스 예시
  const sortList = ["최신순", "조회순"];
  const stackList = ["기술스택1", "기술스택2"];
  const positionList = ["전체", "프론트엔드", "백엔드", "디자이너"];

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
    navigate("/projectlist/new");
  };

  /** Fetch Project List */
  useEffect(() => {
    console.log("🚀 GET PROJECT LIST");
    setIsLoading(true);
    setError(null);

    dispatch(fetchProjectList())
      .unwrap()
      .catch(error => {
        console.warn("🚀 GET PROJECTLIST ERROR", error);
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  // ProjectListContents 정의
  let projectListContent;

  if (isLoading) {
    // 임시 Loading
    projectListContent = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "60vh",
        }}
      >
        Loading...
      </div>
    );
  } else if (error) {
    // ProjectListContent = <div>Error!</div>;
    // Error시 임시 화면처리(Dummy Data)
    projectListContent = (
      <ul className={classes.cardListArea}>
        {projectListData.map(list => (
          <Card key={list.memberBoardId} type="PROJECT_CARD" cardData={list} />
        ))}
      </ul>
    ); // 서버 안될시 TEST
  } else {
    projectListContent = (
      <ul className={classes.cardListArea}>
        {projectListData.map(list => (
          <Card key={list.memberBoardId} type="PROJECT_CARD" cardData={list} />
        ))}
      </ul>
    );
  }

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
        <SearchInput
          placeholder="제목, 키워드 등을 검색해보세요."
          onSubmit={() => {
            console.log("SUBMIT");
          }}
        >
          <SearchSvg stroke="var(--color-gray-4)" />
        </SearchInput>
      </div>

      {projectListContent}

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
