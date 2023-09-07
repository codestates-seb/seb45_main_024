import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
import authInstance from "../../redux/utility/authInstance";
import Card from "../../components/userlist,projectlist/Card";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Tag from "../userlist,projectlist/Tag";
import { ReactComponent as Hashtag } from "../../assets/icons/hashtag.svg";
import classes from "./CardEditor.module.css";

const CardEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 지원포지션 예시
  const positionList = ["전체", "프론트엔드", "백엔드", "디자이너"];
  const [positionSelect, setPositionSelect] = useState("포지션");

  // 키워드 예시
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  // 키워드추가
  // 띄어쓰기 금지, X누르면 지워지도록.
  const onCreateTag = (keyword: string) => {
    setKeywordList(prev => {
      return [keyword, ...prev];
    });
  };

  // POST USER CARD TEST
  const onCreateNewCard = () => {
    console.log("🚀 등록하기 버튼 클릭");
    postUserCard();
  };

  // const baseUrl =
  //   "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";
  // const headers = {
  //   Authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJHJ1UWJYQjhrVzZJeEZSQmhMV1JkVnVaQk04NC9rd09rWWowc2lRaG9yWW1GWExKWHFWWmMyIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk0MDcxNjkzLCJleHAiOjE2OTQwNzM0OTN9.N3-OPzQjTQl_7-CViuJ-oibAXZSynBg-w5wgyGliyR8",
  // };
  const data = {
    title: "제목을 입력해주세요!!!!",
    position: positionSelect,
    keywords: keywordList,
  };

  const postUserCard = async () => {
    try {
      const response = await authInstance.post("/teamboards", data);
      console.log(response);

      // 새 글 등록 후 alert, userlist로 이동
      window.alert("새 글이 등록되었습니다.");
      navigate("/userlist");
    } catch (error) {
      console.warn("POST USERCARD ERROR", error);
    }
  };

  // const postUserCard = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}teamboards`, data, {
  //       headers,
  //     });
  //     console.log(response);

  //     // 새 글 등록 후 alert, userlist로 이동
  //     window.alert("새 글이 등록되었습니다.");
  //     navigate("/userlist");
  //   } catch (error) {
  //     console.warn("POST USERCARD ERROR", error);
  //   }
  // };

  const card = {
    teamBoardId: 0,
    title: "string",
    position: "string",
    keywords: [],
    accountId: 1,
    createdAt: "string",
    modifiedAt: "string",
  };

  return (
    <main>
      <div className={classes.previewArea}>
        <ul>
          <Card type="USER_CARD" cardData={card} isEdit={true} />
          <Card type="USER_CARD" cardData={card} isEdit={true} />
        </ul>
      </div>
      <div className={classes.inputArea}>
        <div className={classes.inputAreaTop}>
          <Selectbox
            title={positionSelect}
            options={positionList}
            selectedOption={positionSelect}
            onSelect={handlePositionSelect}
            borderRadius={4}
          />
        </div>
        <div className={classes.inputAreaBottom}>
          <section className={classes.stack}>
            <h2 className={classes.title}>프로젝트에서 사용할 기술 스택</h2>
          </section>
          <section className={classes.keyword}>
            <h2 className={classes.title}>내가 원하는 프로젝트의 키워드</h2>
            <SearchInput
              placeholder="Enter를 눌러 키워드를 추가해 보세요!"
              onSubmit={keyword => onCreateTag(keyword)}
            >
              <Hashtag stroke="var(--color-gray-4)" />
            </SearchInput>
            <ul>
              {keywordList.map(list => (
                <Tag key={list} type="KEYWORD_TAG" text={list} />
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className={classes.buttonArea}>
        <ActionButton
          type="outline"
          handleClick={() => {
            navigate(-1);
          }}
        >
          취소
        </ActionButton>
        <ActionButton handleClick={onCreateNewCard}>
          {location.pathname.startsWith("/userlist/edit") && "카드 수정하기"}
          {location.pathname.startsWith("/userlist/new") && "카드 등록하기"}
        </ActionButton>
      </div>
    </main>
  );
};

export default CardEditor;
