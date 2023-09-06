import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const keywordList = ["포트폴리오", "사이드프로젝트", "반응형웹", "미디어"];

  const handlePositionSelect = (selected: string) => {
    setPositionSelect(selected);
  };

  return (
    <main>
      <div className={classes.previewArea}>
        <ul>
          <Card type="USER_CARD" title="플레이스홀더" />
          <Card type="USER_CARD" title="플레이스홀더" />
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
            <SearchInput placeholder="Enter를 눌러 키워드를 추가해 보세요!">
              <Hashtag stroke="var(--color-gray-4)" />
            </SearchInput>
            <ul>
              {keywordList.map(list => (
                <Tag type="KEYWORD_TAG" text={list} />
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
        <ActionButton
          handleClick={() => {
            console.log("등록버튼 클릭");
          }}
        >
          {location.pathname.startsWith("/userlist/edit") && "카드 수정하기"}
          {location.pathname.startsWith("/userlist/new") && "카드 등록하기"}
        </ActionButton>
      </div>
    </main>
  );
};

export default CardEditor;
