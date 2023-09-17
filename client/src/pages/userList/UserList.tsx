import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import Pagination from "../../components/userlist,projectlist/Pagination";
import Card from "../../components/userlist,projectlist/card/Card";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";

import { fetchUserCardList } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./UserList.module.css";

const UserList = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userCardData = useAppSelector(state => state.users.data);
  const userCardPageInfo = useAppSelector(state => state.users.pageInfo);
  // console.log("✅ USER LIST", userCardData);
  // console.log("✅ USER PAGE INFO", userCardPageInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // filter 관련 :: 추후 작업
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

  const onCreateNewCard = () => {
    const token = getTokensFromLocalStorage();

    if (!token) {
      window.alert("회원만 카드를 작성할 수 있어요!");
      navigate("/login");
    } else {
      navigate("/userlist/new");
    }
  };

  // 페이지네이션
  const [query, setQuery] = useSearchParams();

  const currentSize = "8"; // 한 페이지 당 노출할 카드 갯수
  const currentPage = query.get("page") === null ? "1" : query.get("page");

  /** Fetch User Card */
  useEffect(() => {
    getUserCards();
  }, [dispatch, currentPage]);

  const queryParamsData = {
    currentPage: currentPage,
    currentSize: currentSize,
  };

  const getUserCards = () => {
    console.log("🚀 GET USER LIST");
    setIsLoading(true);
    setError(null);

    dispatch(fetchUserCardList(queryParamsData))
      .unwrap()
      .catch(error => {
        console.warn("GET USERLIST ERROR", error);
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangePage = page => {
    query.set("page", page);
    setQuery(query);
  };

  // CardListContent 정의
  let CardListContent;

  if (isLoading) {
    // 임시 Loading
    CardListContent = (
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
    // CardListContent = <div>Error!</div>;
    // Error시 임시 화면처리(Dummy Data)
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
        <ActionButton handleClick={onCreateNewCard}>카드 작성하기</ActionButton>
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
          currentPage={currentPage}
          totalCards={userCardPageInfo.totalElements}
          onChangePage={handleChangePage}
        />
      </div>
    </main>
  );
};

export default UserList;
