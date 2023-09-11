import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import axios from "axios";
// import authInstance from "../../redux/utility/authInstance";

import Card from "../../components/userlist,projectlist/card/Card";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Tag from "../userlist,projectlist/Tag";
import { ReactComponent as Hashtag } from "../../assets/icons/hashtag.svg";
import classes from "./CardEditor.module.css";

import { UserListDataType } from "../../model/boardTypes";

import { addUserCard } from "../../redux/store";
import { editUserCard } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";

type CardType = "NEW_CARD" | "EDIT_CARD";

interface CardEditorProps {
  type: CardType;
  originCard?: UserListDataType;
}

const CardEditor = ({ type, originCard }: CardEditorProps) => {
  const NEW_CARD = type === "NEW_CARD";
  const EDIT_CARD = type === "EDIT_CARD";

  console.log("originCard", originCard);

  const navigate = useNavigate();
  const location = useLocation();

  /* 포함되어야 할 정보 : 날짜, 제목, 포지션, 기술스택(일단제외), 태그 */
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("포지션");
  // const [stack, setStack] = useState("")

  // 지원포지션 예시
  const positionList = ["프론트엔드", "백엔드", "디자이너"];

  const handlePositionSelect = (selected: string) => {
    setPosition(selected);
  };

  // 키워드 예시
  const [keywords, setKeywords] = useState<string[]>([]);

  // 키워드 추가
  const onCreateTag = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X
    setKeywords(prev => {
      return [...prev, trimKeyword];
    });
  };

  // 키워드 삭제
  const handleDelete = (targetKeyword: string) => {
    const updatedKeyword = keywords.filter(
      keyword => keyword !== targetKeyword,
    );
    setKeywords(updatedKeyword);
  };

  // Card 수정인 경우
  useEffect(() => {
    if (EDIT_CARD) {
      setDate(originCard?.createdAt);
      setTitle(originCard?.title);
      setPosition(originCard?.position);
      setKeywords(originCard?.keywords);
    }
  }, [EDIT_CARD, originCard]);

  const cardData = {
    // teamBoardId: 0,
    title: title,
    position: position,
    keywords: keywords,
    // accountId: 0,
    createdAt: date,
    // modifiedAt: "",
  };

  /** Loading, Error */
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null); // error는 string or null ?
  // console.log(isLoading, error);

  // const baseUrl =
  //   "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";
  // const headers = {
  //   Authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJHJ1UWJYQjhrVzZJeEZSQmhMV1JkVnVaQk04NC9rd09rWWowc2lRaG9yWW1GWExKWHFWWmMyIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk0MDcxNjkzLCJleHAiOjE2OTQwNzM0OTN9.N3-OPzQjTQl_7-CViuJ-oibAXZSynBg-w5wgyGliyR8",
  // };
  const data = {
    title: title,
    position: position,
    keywords: keywords,
  };

  /** 카드 등록/수정 */
  const handleSubmit = () => {
    console.log("🚀 카드 등록/수정 버튼 클릭", cardData);

    if (
      window.confirm(
        EDIT_CARD
          ? "카드를 수정하시겠습니까?"
          : "새로운 카드를 작성하시겠습니까?",
      )
    ) {
      if (NEW_CARD) {
        setIsLoading(true);
        setError(null);

        dispatch(addUserCard(data))
          .unwrap()
          .then(() => {
            console.log("새글 작성 성공", data);
            // 새 글 등록을 성공하면 alert, userlist로 이동
            // window.alert("새 글이 등록되었습니다.");
            // navigate("/userlist");
          })
          .catch(error => {
            console.warn("POST USERCARD ERROR", error);
            console.log("NEW_CARD data 출력(error)", data);
            setError("Something went wrong");
          })
          .finally(() => setIsLoading(false));
      }

      if (EDIT_CARD) {
        dispatch(editUserCard(originCard?.teamBoardId, data))
          .unwrap()
          .then(() => {
            console.log("카드 수정 성공", data);
          })
          .catch(error => {
            console.warn("EDIT USERCARD ERROR", error);
            console.log(data);
          });
      }
    }
  };

  /*
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
  */

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
          <Card type="USER_CARD" cardData={cardData} isEdit={true} />
          <Card type="USER_CARD" cardData={cardData} isEdit={true} />
          {/* {NEW_CARD && (
            <>
              <Card type="USER_CARD" cardData={cardData} isEdit={true} />
              <Card type="USER_CARD" cardData={cardData} isEdit={true} />
            </>
          )}
          {EDIT_CARD && (
            <>
              <Card type="USER_CARD" cardData={originCard} isEdit={true} />
              <Card type="USER_CARD" cardData={originCard} isEdit={true} />
            </>
          )} */}
        </ul>
      </div>
      <div className={classes.inputArea}>
        <div className={classes.inputAreaTop}>
          <Selectbox
            title={position}
            options={positionList}
            selectedOption={position}
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
              {keywords.map(list => (
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
        <ActionButton handleClick={handleSubmit}>
          {location.pathname.startsWith("/userlist/edit") && "카드 수정하기"}
          {location.pathname.startsWith("/userlist/new") && "카드 등록하기"}
        </ActionButton>
      </div>
    </main>
  );
};

export default CardEditor;
