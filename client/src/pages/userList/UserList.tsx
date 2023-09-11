import { useState, useEffect } from "react";
import { useNavigate /* useSearchParams */ } from "react-router-dom";

// import authInstance from "../../redux/utility/authInstance";

import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/card/Card";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

import { fetchUserCardList } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./UserList.module.css";
// import { UserListDataType } from "./types";

const UserList = () => {
  const navigate = useNavigate();

  // filter 관련: 추후 작업
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

  // pagination 관련: 추후 작업
  // const [totalCard, setTotalCard] = useState(0);
  // const [query, setQuery] = useSearchParams();
  // const currentPage = query.get("page") === null ? 1 : query.get("page");

  const handleClick = () => {
    // TODO :: 로그인하지 않은 사용자면 로그인 페이지로 이동
    navigate("/userlist/new");
  };

  /** Loading, Error */
  const dispatch = useAppDispatch();
  const userCardData = useAppSelector(state => state.users.data);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null); // error는 string or null ?

  /** fetchUserCardList */
  useEffect(() => {
    console.log("🚀 GET USER LIST");
    setIsLoading(true);
    setError(null);

    dispatch(fetchUserCardList())
      .unwrap()
      .catch(error => {
        console.warn("GET USERLIST ERROR", error);
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  /** Axios Instance 사용 코드 - merge 후 사용 예정 */
  /*
    const getUserList = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        // throw Error();
  
        // 인증이 필요한 부분은 authInstance, 필요없는 부분은 commonInstance 사용
        const response = await authInstance.get("/teamboards/?page=1");
  
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
    */

  // CardListContent 정의
  let CardListContent;

  if (isLoading) {
    CardListContent = <div>Loading...</div>;
  } else if (error) {
    // CardListContent = <div>Error!</div>;
    CardListContent = (
      <ul className={classes.cardListArea}>
        {userCardData.map(card => (
          <Card key={card.teamBoardId} type="USER_CARD" cardData={card} />
        ))}
      </ul>
    ); // 서버 안될시 TEST
  } else {
    CardListContent = (
      <ul className={classes.cardListArea}>
        {userCardData.map(card => (
          <Card key={card.teamBoardId} type="USER_CARD" cardData={card} />
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
        <SearchInput
          placeholder="제목, 키워드 등을 검색해보세요."
          onSubmit={() => {
            console.log("SUBMIT 클릭");
          }}
        >
          <SearchSvg stroke="var(--color-gray-4)" />
        </SearchInput>
      </div>
      {CardListContent}
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
