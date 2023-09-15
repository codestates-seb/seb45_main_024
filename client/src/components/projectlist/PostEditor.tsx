import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { sliceISOString, requestFormatDate } from "../../utility/formatDate";
import ActionButton from "../userlist,projectlist/ActionButton";
import SelectBox from "../userlist,projectlist/Selectbox";
import Tag from "../userlist,projectlist/Tag";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProjectListDataType } from "../../model/boardTypes";

import { addProject } from "../../redux/store";
import { editProject } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";

import classes from "./PostEditor.module.css";

interface PostEditorProps {
  isEdit?: boolean;
  originPost?: ProjectListDataType;
}

const PostEditor = ({ isEdit, originPost }: PostEditorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { projectId } = useParams() as { projectId: string };

  const dispatch = useAppDispatch();

  /* 포함되어야 할 정보 : 제목, 내용, 포지션, 기술스택(일단제외), 모집상태, 시작날짜, 종료날짜 */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [position, setPosition] = useState("포지션");
  const [status, setStatus] = useState("팀원 구하는중"); // 모집중 0, 모집완료 1
  const [startDate, setStartDate] = useState<string>(
    sliceISOString(new Date()),
  );
  const [endDate, setEndDate] = useState<string>("2023-12-31");

  // Format Date
  const requestStartDate = requestFormatDate(startDate);
  const requestEndDate = requestFormatDate(endDate);

  // 지원포지션 예시
  const positionList = ["프론트엔드", "백엔드"];

  // 포지션 및 인원
  const [positionNumber, setPositionNumber] = useState<number | string>(1);
  const [positionInfo, setPositionInfo] = useState<string[]>([]); // ex. ["프론트엔드 1명", "백엔드 1명"]
  const requestPositionInfo = positionInfo.join(", "); // ex. "프론트엔드 1명, 백엔드 1명"

  const handlePositionSelect = (selected: string) => {
    setPosition(selected);
  };

  const handleChangeInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPositionNumber(e.target.value);
  };

  const handleKeyUpInputNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.code;
    if (keyCode === "Enter") {
      onCreateTag(position);
    }
  };

  const onCreateTag = (position: string) => {
    const combText = `${position} ${positionNumber}명`;

    // if (positionInfo.map(item => positionInfo.includes(item))) {
    //   return;
    // }

    setPositionInfo(prev => {
      return [...prev, combText];
    });
  };

  const onDeleteTag = (target: string) => {
    const updatedTag = positionInfo.filter(tag => tag !== target);
    setPositionInfo(updatedTag);
  };

  // Date
  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  /** EDIT POST인 경우 (게시글 수정) */
  useEffect(() => {
    if (isEdit) {
      setTitle(originPost?.title);
      setContent(originPost?.content);
      setPositionInfo(
        originPost?.position.split(", ").map(item => item.trim()),
      );
      setStatus(originPost?.status);
      setStartDate(sliceISOString(originPost?.startDate));
      setEndDate(sliceISOString(originPost?.endDate));
    }
  }, [isEdit, originPost]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const data = {
    title: title,
    content: content,
    status: status,
    position: requestPositionInfo,
    startDate: requestStartDate,
    endDate: requestEndDate,
  };

  const checkValidData = () => {
    const checkTitle = title.trim().length === 0;
    const checkContent = content.trim().length === 0;
    const checkRequestPositionInfo = requestPositionInfo === "";

    if (checkTitle || checkContent || checkRequestPositionInfo) {
      return false;
    }

    return true;
  };

  /* Creact or Edit Project */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("🚀 CREATE/EDIT POST");

    // 모든 필드가 채워진 상태일 경우에만 생성/수정 가능
    if (!checkValidData()) {
      alert("입력값을 모두 채워주세요.");
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "게시글을 수정 하시겠습니까?"
          : "새로운 게시글을 작성 하시겠습니까?",
      )
    ) {
      if (!isEdit) {
        setIsLoading(true);
        setError(null);

        dispatch(addProject(data))
          .unwrap()
          .then(() => {
            console.log("🚀 CREATE 성공", data);
            window.alert("새 글이 등록되었습니다.");
            navigate("/projectlist");
          })
          .catch(error => {
            console.warn("🚀 CREATE 실패", error, data);
            setError("Something went wrong");
          })
          .finally(() => setIsLoading(false));
      }

      if (isEdit) {
        setIsLoading(true);
        setError(null);

        const targetId = originPost?.memberBoardId;

        dispatch(editProject({ targetId, data }))
          .unwrap()
          .then(() => {
            console.log("🚀 EDIT 성공", data);
            window.alert("게시글이 수정되었습니다.");
            navigate(`/projectlist/${targetId}`);
          })
          .catch(error => {
            console.warn("🚀 EDIT 실패", error, data);
            setError("Something went wrong");
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  return (
    <main className={classes.detail}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className={classes.title}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <div className={classes.detailInfo}>
          <dl>
            <dt>프로젝트 예상기간</dt>
            <dd>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDate}
                required
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDate}
                required
              />
            </dd>
          </dl>
          <dl className={classes.positionList}>
            <dt>포지션 및 인원</dt>
            <dd>
              <SelectBox
                title={position}
                options={positionList}
                selectedOption={position}
                onSelect={handlePositionSelect}
                borderRadius={4}
              />
              <input
                type="number"
                placeholder="00 명"
                value={positionNumber}
                onChange={handleChangeInputNumber}
                onKeyUp={handleKeyUpInputNumber}
                onKeyDown={e => {
                  e.preventDefault();
                }}
                required
              />
              <span className={classes.infoText}>
                포지션과 인원을 입력하고 Enter를 눌러주세요!
              </span>
            </dd>
          </dl>
          {positionInfo.length > 0 && (
            <dl>
              <dt style={{ visibility: "hidden" }}>선택된 포지션 및 인원</dt>
              <dd>
                <ul>
                  {positionInfo.map(list => (
                    <Tag
                      key={list}
                      type="KEYWORD_TAG"
                      text={list}
                      onDelete={onDeleteTag}
                    />
                  ))}
                </ul>
              </dd>
            </dl>
          )}
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
          <ReactQuill
            theme="snow"
            placeholder="프로젝트를 소개해 주세요!"
            value={content}
            onChange={setContent}
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
          <ActionButton buttonType={"submit"}>
            {location.pathname.startsWith("/projectlist/edit") &&
              "카드 수정하기"}
            {location.pathname.startsWith("/projectlist/new") &&
              "카드 등록하기"}
          </ActionButton>
        </div>
      </form>
    </main>
  );
};

export default PostEditor;
