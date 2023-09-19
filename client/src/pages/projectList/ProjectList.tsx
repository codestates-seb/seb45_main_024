import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/card/Card";
import Checkbox from "../../components/userlist,projectlist/Checkbox";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";

import { fetchProjectList } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./ProjectList.module.css";

const ProjectList = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const projectListData = useAppSelector(state => state.projects.data);
  const projectListPageInfo = useAppSelector(state => state.projects.pageInfo);
  // console.log("✅ PROJECT LIST", projectListData);
  // console.log("✅ PAGE PAGE INFO", projectListPageInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // 섹렉트박스 예시
  const sortList = ["최신순", "조회순"];
  const positionList = ["전체", "프론트엔드", "백엔드"];

  const [sortSelect, setSortSelect] = useState("최신순");
  const [positionSelect, setPositionSelect] = useState("전체");

  // 모집중만보기
  const [isChecked, setIsChecked] = useState(false);

  const handleSortSelect = (selected: string) => {
    setSortSelect(selected);
  };

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  const handleClick = () => {
    const token = getTokensFromLocalStorage();

    if (!token) {
      window.alert("회원만 글을 작성할 수 있어요!");
      navigate("/login");
    } else {
      navigate("/projectlist/new");
    }
  };

  // 페이지네이션
  const [query, setQuery] = useSearchParams();

  const currentSize = "8"; // 한 페이지 당 노출할 카드 갯수
  const currentPage = query.get("page") === null ? "1" : query.get("page");

  // 최신순, 조회순 정렬 (default: 최신순, /memberboards/view?page=1&size=8 조회순)
  const currentSort = sortSelect === "조회순" ? "view" : "";

  // 포지션필터 (default: 전체, /search?position=백엔드&page=1&size=8)
  const currentFilter = positionSelect === "전체" ? "" : positionSelect;

  // 검색
  const [currentSearch, setCurrentSearch] = useState("");

  const onSearchTitle = (text: string) => {
    setCurrentSearch(text);
  };

  /** Fetch Project List */
  useEffect(() => {
    getProjects();
    // setCurrentSearch("");
  }, [dispatch, currentPage, currentSort, currentFilter, currentSearch]);

  const queryParamsData = {
    currentSort: currentSort,
    currentPage: currentPage,
    currentSize: currentSize,
    currentFilter: currentFilter,
    currentSearch: currentSearch,
  };

  // console.log("✅ queryParamsData", queryParamsData);

  const getProjects = () => {
    // console.log("🚀 GET PROJECT LIST");
    setIsLoading(true);
    setError(null);

    dispatch(fetchProjectList(queryParamsData))
      .unwrap()
      .catch(error => {
        console.warn("🚀 GET PROJECTLIST ERROR", error);
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangePage = page => {
    query.set("page", page);
    setQuery(query);
  };

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
          title={positionSelect}
          options={positionList}
          selectedOption={positionSelect}
          onSelect={handlePositionSelect}
        />
        <Checkbox
          title="recruit"
          text="모집중만 보기"
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        <SearchInput
          placeholder="제목을 검색해보세요!"
          onSubmit={text => onSearchTitle(text)}
        >
          <SearchSvg stroke="var(--color-gray-4)" />
        </SearchInput>
      </div>

      {projectListContent}

      <div className={classes.pagination}>
        <Pagination
          currentPage={currentPage}
          totalCards={projectListPageInfo.totalElements}
          onChangePage={handleChangePage}
        />
      </div>
    </main>
  );
};

export default ProjectList;
