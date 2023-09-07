import { useState, useEffect } from "react";
import { useNavigate /* useSearchParams */ } from "react-router-dom";
import axios from "axios";
// import authInstance from "../../redux/utility/authInstance";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/Card";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import dummyData from "./dummy-data.json"; // 임시 더미데이터
import classes from "./UserList.module.css";

import { CardType } from "./types";

const UserList = () => {
  const navigate = useNavigate();

  // 섹렉트박스 예시
  const stackList = ["기술스택1", "기술스택2"];
  const positionList = ["전체", "프론트엔드", "백엔드", "디자이너"];

  const [stackSelect, setStackSelect] = useState("기술스택");
  const [positionSelect, setPositionSelect] = useState("포지션");

  const handleStackSelect = (selected: string) => {
    setStackSelect(selected);
  };

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  const handleClick = () => {
    // TODO :: 로그인하지 않은 사용자면 로그인 페이지로 이동
    navigate("/userlist/new");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null); // 임시

  // const [totalCard, setTotalCard] = useState(0);

  // const [query, setQuery] = useSearchParams();

  // const currentPage = query.get("page") === null ? 1 : query.get("page");

  const [cardData, setCardData] = useState<CardType[]>([]);
  console.log("cardData", cardData);

  // Axios 요청 (추후에 AxiosInstance 생성)
  // const baseUrl =
  //   "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";

  useEffect(() => {
    console.log("🚀 GET USER LIST");
    getUserList();
  }, []);

  // Axios Instance 사용 코드
  // const getUserList = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     // throw Error();

  //     // 인증이 필요없는 부분은 commonInstance 사용하면됨!
  //     const response = await authInstance.get("/teamboards/?page=1");

  //     const listData = response.data.data;
  //     // const totalElements = response.pageInfo.totalElements;

  //     setCardData(listData);
  //     // setTotalCard(totalElements)
  //   } catch (error) {
  //     console.warn("GET USERLIST ERROR", error);
  //     setError("Something went wrong");

  //     // Error일 경우, dummy data로 임시 화면 표시
  //     const data = dummyData.teamboards.data;
  //     console.log(data);

  //     setCardData(data);
  //   }

  //   setIsLoading(false);
  // };

  // GET USER LIST TEST
  const getUserList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      throw Error();

      const response = await axios.get(`${baseUrl}teamboards/?page=1`);

      const listData = response.data.data;
      // const totalElements = response.pageInfo.totalElements;

      setCardData(listData);
      // setTotalCard(totalElements)
    } catch (error) {
      console.warn("GET USERLIST ERROR", error);
      setError("Something went wrong");

      // Error일 경우, dummy data로 임시 화면 표시
      const data = dummyData.teamboards.data;
      console.log(data);

      setCardData(data);
    }

    setIsLoading(false);
  };

  return (
    <main>
      <div className={classes.buttonArea}>
        <ActionButton handleClick={handleClick}>카드 작성하기</ActionButton>
      </div>
      <div className={classes.searchArea}>
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
        <SearchInput placeholder="제목, 키워드 등을 검색해보세요.">
          <SearchSvg stroke="var(--color-gray-4)" />
        </SearchInput>
      </div>

      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul className={classes.cardListArea}>
          {/* {cardData.map(card => console.log(card))} */}
          {cardData.length > 0 &&
            cardData.map(card => (
              <Card key={card.teamBoardId} type="USER_CARD" cardData={card} />
            ))}
        </ul>
      )}
      {error && (
        <div style={{ marginTop: "1rem" }}>
          위 정보는 더미데이터입니다. (에러처리 임시)
        </div>
      )}

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

export default UserList;
