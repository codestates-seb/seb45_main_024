import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Hashtag } from "../../assets/icons/hashtag.svg";
import { UserListDataType } from "../../model/boardTypes";
import Card from "../../components/userlist,projectlist/card/Card";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Tag from "../userlist,projectlist/Tag";

import { addUserCard } from "../../redux/store";
import { editUserCard } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./CardEditor.module.css";

type CardType = "NEW_CARD" | "EDIT_CARD";

interface CardEditorProps {
  type: CardType;
  originCard?: UserListDataType;
}

const CardEditor = ({ type, originCard }: CardEditorProps) => {
  // console.log("originCard", originCard);
  const NEW_CARD = type === "NEW_CARD";
  const EDIT_CARD = type === "EDIT_CARD";

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const newTitle = useAppSelector(state => state.users.editTitle);
  // console.log("newTitle: ", newTitle);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  /** 포함되어야 할 정보 : 날짜, 제목, 포지션, 기술스택(일단제외), 태그 */
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [title, setTitle] = useState(newTitle);
  const [position, setPosition] = useState("포지션");
  // const [stack, setStack] = useState("")

  useEffect(() => {
    setTitle(newTitle);
  }, [newTitle]);

  // 지원포지션 예시
  const positionList = ["프론트엔드", "백엔드"];

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

  /** EDIT CARD인 경우 (카드 수정) */
  useEffect(() => {
    if (EDIT_CARD) {
      setDate(originCard?.createdAt);
      setTitle(originCard?.title);
      setPosition(originCard?.position);
      setKeywords(originCard?.keywords);
    }
  }, [EDIT_CARD, originCard]);

  // 수정일 경우 origin 데이터를 set하고, cardData를 props로 넘김
  // 생성일 경우 빈 값이 담긴 cardData를 card 컴포넌트로 넘김
  const cardData = {
    // teamBoardId: 0,
    title: title,
    position: position,
    keywords: keywords,
    // accountId: 0,
    createdAt: date,
    // modifiedAt: "",
  };

  const data = {
    title: newTitle, // "제목형식string"
    position: position, // "포지션형식string"
    keywords: keywords, // ["키워드1", "키워드2"]
  };

  // const data = {
  //   title: "제목...",
  //   position: "백엔드",
  //   keywords: ["코딩", "작업", "테스트"],
  // };

  /* Creact or Edit Card */
  const handleSubmit = () => {
    debugger;
    console.log("🚀 CREATE/EDIT CARD", data);

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
            console.log("🚀 CREATE 성공", data);
            window.alert("새 글이 등록되었습니다.");
            // navigate("/userlist");
          })
          .catch(error => {
            console.warn("🚀 CREATE 실패", error, data);
            setError("Something went wrong");
          })
          .finally(() => setIsLoading(false));
      }

      if (EDIT_CARD) {
        setIsLoading(true);
        setError(null);

        const targetId = originCard?.teamBoardId;

        dispatch(editUserCard({ targetId, data }))
          .unwrap()
          .then(() => {
            console.log("🚀 EDIT 성공", data);
            window.alert("카드가 수정되었습니다.");
            navigate("/userlist");
          })
          .catch(error => {
            console.warn("🚀 EDIT 실패", error, data);
          });
      }
    }
  };

  return (
    <main>
      <div className={classes.previewArea}>
        <ul>
          <Card type="USER_CARD" cardData={cardData} isEdit={true} />
          <Card type="USER_CARD" cardData={cardData} isEdit={true} />
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
            width={150}
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
