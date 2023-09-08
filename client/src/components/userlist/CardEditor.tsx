import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
// import authInstance from "../../redux/utility/authInstance";

import Card from "../../components/userlist,projectlist/card/Card";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Tag from "../userlist,projectlist/Tag";
import { ReactComponent as Hashtag } from "../../assets/icons/hashtag.svg";
import classes from "./CardEditor.module.css";

import { UserListDataType } from "../../pages/userList/types";

type CardType = "NEW_CARD" | "EDIT_CARD";

interface CardEditorProps {
  type: CardType;
  originCard?: UserListDataType;
}

const CardEditor = ({ type, originCard }: CardEditorProps) => {
  const NEW_CARD = type === "NEW_CARD";
  const EDIT_CARD = type === "EDIT_CARD";

  console.log(originCard);

  const navigate = useNavigate();
  const location = useLocation();

  // 지원포지션 예시
  const positionList = ["프론트엔드", "백엔드", "디자이너"];
  const [positionSelect, setPositionSelect] = useState("포지션");

  // 키워드 예시
  const [keyword, setKeyword] = useState<string[]>([]);

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  // 키워드추가
  const onCreateTag = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X
    setKeyword(prev => {
      return [...prev, trimKeyword];
    });
  };

  const handleDelete = (targetKeyword: string) => {
    const updatedKeyword = keyword.filter(keyword => keyword !== targetKeyword);
    setKeyword(updatedKeyword);
  };

  /** Aixos :: POST User Card */
  const onCreateNewCard = () => {
    console.log("🚀 카드 등록하기");
    postUserCard();
  };

  const baseUrl =
    "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJHJ1UWJYQjhrVzZJeEZSQmhMV1JkVnVaQk04NC9rd09rWWowc2lRaG9yWW1GWExKWHFWWmMyIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk0MDcxNjkzLCJleHAiOjE2OTQwNzM0OTN9.N3-OPzQjTQl_7-CViuJ-oibAXZSynBg-w5wgyGliyR8",
  };
  const data = {
    title: "제목을 입력해주세요!!!!",
    position: positionSelect,
    keywords: keyword,
  };

  const postUserCard = async () => {
    try {
      const response = await axios.post(`${baseUrl}teamboards`, data, {
        headers,
      });
      console.log(response);

      // 새 글 등록 후 alert, userlist로 이동
      window.alert("새 글이 등록되었습니다.");
      navigate("/userlist");
    } catch (error) {
      console.warn("POST USERCARD ERROR", error);
    }
  };

  // 새 글 작성이면, 빈 데이터를
  // 수정하는 글이면 기존의 데이터를 가져와야 함.

  // {
  //   "title": "팀찾기",
  //   "position": "프론트엔드",
  //   "keywords": ["교육", "미디어"]
  // }

  const cardData = {
    // teamBoardId: 0,
    title: "",
    position: positionSelect,
    keywords: keyword,
    // accountId: 0,
    createdAt: new Date().toLocaleDateString().toString(),
    // modifiedAt: "",
  };

  /** Axios Instance 사용 코드 - merge 후 사용 예정 */
  /*
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
  */

  return (
    <main>
      <div className={classes.previewArea}>
        <ul>
          {NEW_CARD && (
            <>
              <Card type="USER_CARD" cardData={cardData} isEdit={true} />
              <Card type="USER_CARD" cardData={cardData} isEdit={true} />
            </>
          )}
          {EDIT_CARD && (
            <>
              <Card type="USER_CARD" cardData={cardData} isEdit={true} />
              <Card type="USER_CARD" cardData={cardData} isEdit={true} />
            </>
          )}
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
              {keyword.map(list => (
                <Tag
                  key={list}
                  type="KEYWORD_TAG"
                  text={list}
                  onDelete={handleDelete}
                />
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
