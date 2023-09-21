import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Hashtag } from "../../assets/icons/hashtag.svg";
import { UserListDataType } from "../../model/boardTypes";
import Card from "../../components/userlist,projectlist/card/Card";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Selectbox from "../../components/userlist,projectlist/Selectbox";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import Tag from "../userlist,projectlist/Tag";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import { extractNumbersBeforeColon } from "../../utility/exceptColonFromTechResponse";

import { addUserCard } from "../../redux/store";
import { editUserCard } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./CardEditor.module.css";

// 임시
import authInstance from "../../utility/authInstance";
import dummyData from "../../dummy-data.json";
import GetLogo from "../mypage/format/GetLogo";

// type CardType = "NEW_CARD" | "EDIT_CARD";

interface CardEditorProps {
  // type?: CardType;
  originCard?: UserListDataType;
}

interface AccessTokenType {
  id: number;
}

// 타입 따로 빼두기
interface TechTagTypes {
  id: number;
  techName: string;
  tagType: "BACK_END" | "FRONT_END" | "MOBILE" | "ETC";
}

// originCard가 있으면 EDIT_CARD, originCard가 없으면 NEW_CARD
const CardEditor = ({ originCard }: CardEditorProps) => {
  console.log("✅ ORIGIN CARD", originCard);
  // const NEW_CARD = type === "NEW_CARD";
  // const EDIT_CARD = type === "EDIT_CARD";

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const editTitle = useAppSelector(state => state.users.editTitle);
  const [newTitle, setNewTitle] = useState(editTitle);

  useEffect(() => {
    setNewTitle(editTitle);
  }, [editTitle]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // 나의 기술스택 조회
  const token = getTokensFromLocalStorage() as AccessTokenType;
  let tokenId: number;

  const [myTechTags, setMyTechTags] = useState<TechTagTypes[]>([]);

  if (token) {
    tokenId = token.id;
  }

  useEffect(() => {
    getMyTechTags();
  }, []);

  const getMyTechTags = async () => {
    try {
      // throw new Error();

      const response = await authInstance.get(`/mypages/profile/${tokenId}`);
      const techData = await response.data.techTags; // [{…}, {…}, {…}, {…}, {…}, {…}, {…}]

      setMyTechTags(techData);
    } catch (error) {
      // 서버 연결 안되었을 경우 더미데이터 노출
      console.warn(error);

      const techData = dummyData.mypages.techTags as TechTagTypes[];

      setMyTechTags(techData);
    }
  };

  /** 포함되어야 할 정보 : 날짜, 제목, 포지션, 기술스택(일단제외), 태그 */
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [title, setTitle] = useState(originCard?.title);
  const [position, setPosition] = useState("포지션");

  const [techTags, setTechTags] = useState<number[]>([]);

  // 지원포지션 예시
  const positionList = ["프론트엔드", "백엔드"];

  const handlePositionSelect = (selected: string) => {
    setPosition(selected);
  };

  // 기술스택 선택
  const onSelectTechTags = (selectedId: number) => {
    // console.log(selectedId);

    const isSelected = techTags.includes(selectedId);
    // console.log("isSelected", isSelected);

    if (isSelected) {
      // 선택된 태그일 경우
      const updatedTechTags = techTags.filter(id => id !== selectedId);
      setTechTags(updatedTechTags);
    } else {
      // 선택되지 않은 태그일 경우
      setTechTags(prev => [...prev, selectedId]);
    }
  };

  // 키워드 예시
  const [keywords, setKeywords] = useState<string[]>([]);

  // 키워드 추가
  const onCreateTag = (keyword: string) => {
    const trimKeyword = keyword.split(" ").join(""); // 공백 허용 X

    // 같은 키워드 추가 금지
    if (!keywords.includes(trimKeyword)) {
      setKeywords(prev => {
        return [...prev, trimKeyword];
      });
    }
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
    if (originCard) {
      // const techId = extractNumbersBeforeColon(originCard?.techTagList);

      // console.log("EDIT CARD", originCard);

      setDate(originCard?.createdAt);
      setTitle(originCard?.title);
      // setTitle(newTitle);
      setPosition(originCard?.position);
      setKeywords(originCard?.keywords);
      setTechTags(extractNumbersBeforeColon(originCard?.techTagList));
    }
  }, [originCard]);

  // 수정일 경우 origin 데이터를 set하고, cardData를 props로 넘김
  // 생성일 경우 빈 값이 담긴 cardData를 card 컴포넌트로 넘김
  const cardData = {
    title: title,
    position: position,
    keywords: keywords,
    createdAt: date,
    techTagList: techTags,
  };

  const data = {
    title: newTitle, // "제목형식string"
    position: position, // "포지션형식string"
    keywords: keywords, // ["키워드1", "키워드2"]
    techTagIdList: techTags, // [1,3,5]
  };

  const checkValidData = () => {
    const checkTitle = newTitle.trim().length === 0;
    const checkPosition = position.trim().length === 0 || position === "포지션";
    const checkKeywords = keywords.length === 0;
    const checkTechTags = techTags.length === 0;

    if (checkTitle || checkPosition || checkKeywords || checkTechTags) {
      return false;
    }

    return true;
  };

  /* Creact or Edit Card */
  const handleSubmit = () => {
    // console.log("🚀 CREATE/EDIT CARD", data);

    // 모든 필드가 채워진 상태일 경우에만 생성/수정 가능
    if (!checkValidData()) {
      alert("입력값을 모두 채워주세요.");
      return;
    }

    if (
      window.confirm(
        originCard
          ? "카드를 수정하시겠습니까?"
          : "새로운 카드를 작성하시겠습니까?",
      )
    ) {
      if (!originCard) {
        setIsLoading(true);
        setError(null);

        dispatch(addUserCard(data))
          .unwrap()
          .then(() => {
            // console.log("🚀 CREATE 성공", data);
            window.alert("새 글이 등록되었습니다.");
            navigate("/userlist");
          })
          .catch(error => {
            // console.warn("🚀 CREATE 실패", error, data);
            setError("Something went wrong");
          })
          .finally(() => setIsLoading(false));
      }

      if (originCard) {
        setIsLoading(true);
        setError(null);

        const targetId = originCard?.teamBoardId;

        dispatch(editUserCard({ targetId, data }))
          .unwrap()
          .then(() => {
            // console.log("🚀 EDIT 성공", data);
            window.alert("카드가 수정되었습니다.");
            navigate("/userlist");
          })
          .catch(error => {
            alert("제목을 수정해주세요!");
            // console.warn("🚀 EDIT 실패", error, data);
          });
      }
    }
  };

  return (
    <main>
      <div className={classes.previewArea}>
        <ul className={classes.editCardFrontAndBack}>
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
          <section className={classes.techTagsSection}>
            <h2 className={classes.title}>프로젝트에서 사용할 기술 스택</h2>
            <ul className={classes.techTags}>
              {myTechTags.length > 0 ? (
                <>
                  {myTechTags.map(techData => (
                    <li
                      key={techData.id}
                      onClick={() => onSelectTechTags(techData.id)}
                      className={
                        techTags.includes(techData.id)
                          ? `${classes.selected}`
                          : ""
                      }
                    >
                      <GetLogo logoTitle={techData.techName} />
                    </li>
                  ))}
                </>
              ) : (
                <>
                  <li className={classes.TechTagInfoText}>
                    😮 현재 추가되어있는 기술스택이 없습니다.
                  </li>
                  <li className={classes.TechTagInfoText}>
                    마이페이지에서 내가 사용할 수 있는 기술스택을 추가해 주세요!
                  </li>
                  <li
                    className={classes.TechTagInfoText}
                    onClick={() =>
                      navigate(`/mypage/${tokenId}`, { replace: true })
                    }
                  >
                    마이페이지로 바로가기 &gt;
                  </li>
                </>
              )}
            </ul>
          </section>
          <section className={classes.keywordSection}>
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
            navigate(-1, { replace: true });
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
