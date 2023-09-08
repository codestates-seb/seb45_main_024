import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/card/Card";
import Checkbox from "../../components/userlist,projectlist/Checkbox";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

import dummyData from "../../dummy-data.json"; // TEST용 Dummy Data

import classes from "./ProjectList.module.css";

import { ProjectListDataType } from "../userList/types";

const ProjectList = () => {
  const navigate = useNavigate();

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

  // 임시
  const [projectData, setProjectData] = useState<ProjectListDataType[]>([]);
  console.log("cardData", projectData);

  useEffect(() => {
    console.log("🚀 GET PROJECT LIST");
    getProjectList();
  }, []);

  // GET USER LIST TEST
  const getProjectList = async () => {
    // setIsLoading(true);
    // setError(null);

    try {
      throw Error();

      // const response = await axios.get(`${baseUrl}teamboards/?page=1`);

      // const listData = response.data.data;
      // // const totalElements = response.pageInfo.totalElements;

      // setCardData(listData);
      // // setTotalCard(totalElements)
    } catch (error) {
      console.warn("GET USERLIST ERROR", error);
      // setError("Something went wrong");

      // Error일 경우, dummy data로 임시 화면 표시
      const data = dummyData.memberboards.data;
      console.log(data);

      setProjectData(data);
    }

    // setIsLoading(false);
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
        <SearchInput
          placeholder="제목, 키워드 등을 검색해보세요."
          onSubmit={() => {
            console.log("SUBMIT");
          }}
        >
          <SearchSvg stroke="var(--color-gray-4)" />
        </SearchInput>
      </div>

      <ul className={classes.cardListArea}>
        {/* {cardList.map(list => (
          <Card type="PROJECT_CARD" cardData={card} />
        ))} */}
        {projectData.length > 0 &&
          projectData.map(card => (
            // <Card key={card.teamBoardId} type="USER_CARD" cardData={card} />
            <Card
              key={card.memberBoardId}
              type="PROJECT_CARD"
              cardData={card}
            />
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
