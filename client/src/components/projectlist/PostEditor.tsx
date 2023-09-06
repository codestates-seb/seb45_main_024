import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ActionButton from "../userlist,projectlist/ActionButton";
import SelectBox from "../userlist,projectlist/Selectbox";
import Tag from "../userlist,projectlist/Tag";
import classes from "./PostEditor.module.css";

const PostEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState("");

  // 임시 포지션 및 인원
  const positionList = ["프론트엔드 1명", "백엔드 1명"];

  return (
    <main className={classes.detail}>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className={classes.title}
      />
      <div className={classes.detailInfo}>
        <dl>
          <dt>프로젝트 예상기간</dt>
          <dd>
            <input type="date" />
            <input type="date" />
          </dd>
        </dl>
        <dl>
          <dt>포지션 및 인원</dt>
          <dd>
            <SelectBox
              title="포지션"
              options={["옵션1"]}
              selectedOption="포지션"
              onSelect={() => {
                console.log("임시입니다.");
              }}
              borderRadius={4}
            />
            <input type="number" placeholder="00명" />
          </dd>
        </dl>
        <dl>
          <dt style={{ visibility: "hidden" }}>선택된 포지션 및 인원</dt>
          <dd className={classes.positionList}>
            <ul>
              {positionList.map(list => (
                <Tag type="SELECTED_TAG" text={list} />
              ))}
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>기술 스택</dt>
          <dd>
            <SelectBox
              title="기술스택"
              options={["옵션1"]}
              selectedOption="포지션"
              onSelect={() => {
                console.log("임시입니다.");
              }}
              borderRadius={4}
            />
          </dd>
        </dl>
        {/* <dl>
          <dt style={{ visibility: "hidden" }}>선택된 기술 스택</dt>
          <dd className={classes.stackList}>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
            </ul>
          </dd>
        </dl> */}
      </div>
      <div className={classes.description}>
        <h3>프로젝트 소개</h3>
        {/* react-quill 텍스트 에디터 영역 */}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ height: "500px" }}
        />
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
            console.log("카드 등록하기 버튼");
          }}
        >
          {location.pathname.startsWith("/projectlist/edit") && "카드 수정하기"}
          {location.pathname.startsWith("/projectlist/new") && "카드 등록하기"}
        </ActionButton>
      </div>
    </main>
  );
};

export default PostEditor;
