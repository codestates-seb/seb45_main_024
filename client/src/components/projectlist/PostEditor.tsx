import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ActionButton from "../userlist,projectlist/ActionButton";
import SelectBox from "../userlist,projectlist/Selectbox";
import classes from "./PostEditor.module.css";

const PostEditor = () => {
  const [value, setValue] = useState("");

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
        {/* <dl>
          <dt style={{ visibility: "hidden" }}>선택된 포지션 및 인원</dt>
          <dd className={classes.positionList}>
            <ul>
              <li>프론트엔드 1명</li>
              <li>백엔드 2명</li>
            </ul>
          </dd>
        </dl> */}
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
            console.log("취소버튼");
          }}
        >
          취소
        </ActionButton>
        <ActionButton
          handleClick={() => {
            console.log("카드 등록하기 버튼");
          }}
        >
          카드 등록하기
        </ActionButton>
      </div>
    </main>
  );
};

export default PostEditor;
