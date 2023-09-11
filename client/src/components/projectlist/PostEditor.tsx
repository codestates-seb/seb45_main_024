import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ActionButton from "../userlist,projectlist/ActionButton";
import SelectBox from "../userlist,projectlist/Selectbox";
import Tag from "../userlist,projectlist/Tag";

import { addProject } from "../../redux/store";
import { editProject } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import { ProjectListDataType } from "../../model/boardTypes";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import classes from "./PostEditor.module.css";

interface PostEditorProps {
  isEdit?: boolean;
  originPost?: ProjectListDataType;
}

const PostEditor = ({ isEdit, originPost }: PostEditorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  // const projectId = id;
  // console.log(projectId);

  //value="2023-09-13"
  // TODO: 날짜 포맷팅 함수 따로 빼놓기
  const getStringDate = (date: string) => {
    return new Date(date).toISOString().slice(0, 10); // YYYY-MM-DD
  };

  /* 포함되어야 할 정보 : 제목, 내용, 포지션, 기술스택(일단제외), 모집상태, 시작날짜, 종료날짜 */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [position, setPosition] = useState("포지션");
  const [status, setStatus] = useState("모집중");
  const [startDate, setStartDate] = useState<string>("2023-09-10");
  const [endDate, setEndDate] = useState<string>("2023-12-31");

  // 2023-01-28T11:22:33
  const requestStartDate = new Date(startDate).toISOString().split(".")[0];
  const requestEndDate = new Date(endDate).toISOString().split(".")[0];

  // const [editor, setEditor] = useState(content);

  // 임시 포지션 및 인원
  const [positionNumber, setPositionNumber] = useState(1);
  const [positionInfo, setPositionInfo] = useState([]);
  // console.log(positionInfo);
  const requestPositionInfo = positionInfo.join(", ");
  // console.log(requestPositionInfo);

  // 지원포지션 예시
  const positionList = ["프론트엔드", "백엔드", "디자이너"];

  const handlePositionSelect = (selected: string) => {
    setPosition(selected);
  };

  // Date
  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // 키워드 추가
  const onCreateTag = (keyword: string) => {
    const combKeyword = `${keyword} ${positionNumber}명`;
    setPositionInfo(prev => {
      return [...prev, combKeyword];
    });
    console.log();
  };

  // 키워드 삭제
  const handleDelete = (targetKeyword: string) => {
    const updatedKeyword = positionInfo.filter(
      keyword => keyword !== targetKeyword,
    );
    setPositionInfo(updatedKeyword);
  };

  // 게시글 수정인 경우
  useEffect(() => {
    if (isEdit) {
      setTitle(originPost?.title);
      setContent(originPost?.content);
      // setPosition(originPost?.position);
      setPositionInfo(
        originPost?.position.split(", ").map(item => item.trim()),
      );
      setStatus(originPost?.status);
      setStartDate(getStringDate(originPost?.startDate));
      setEndDate(getStringDate(originPost?.endDate));
    }
  }, [isEdit, originPost]);

  /* Create OR Edit Project */
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // const baseUrl =
  //   "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";
  // const headers = {
  //   Authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJHJ1UWJYQjhrVzZJeEZSQmhMV1JkVnVaQk04NC9rd09rWWowc2lRaG9yWW1GWExKWHFWWmMyIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk0MDcxNjkzLCJleHAiOjE2OTQwNzM0OTN9.N3-OPzQjTQl_7-CViuJ-oibAXZSynBg-w5wgyGliyR8",
  // };
  const data = {
    title: title,
    content: content,
    status: status,
    position: requestPositionInfo,
    startDate: requestStartDate,
    endDate: requestEndDate,
  };

  // const data = {
  //   title: "안녕이건ID13번게시글입니다!!!!!",
  //   content: "내용13131313",
  //   status: "팀원 구하는중",
  //   position: "프론트엔드 2명",
  //   startDate: "2023-02-18T11:22:33",
  //   endDate: "2023-03-18T11:22:33",
  // };

  /** REQUEST DATA 
  const data = {
    title: "제목입니다666",
    content: "내용입니다.444",
    status: "팀원 구하는중",
    position: "백엔드 3명, 프론트엔드 2명",
    startDate: "2023-01-18T11:22:33",
    endDate: "2023-01-28T11:22:33",
  };
  */

  const handleSubmit = () => {
    console.log("🚀 게시글 등록/수정 버튼 클릭");

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
            console.log("새글 작성 성공", data);
            // 새 글 등록을 성공하면 alert, 해당게시글로 이동
            // window.alert("새 글이 등록되었습니다.");
            // navigate("/projectlist");
          })
          .catch(error => {
            console.warn("POST PROJECT ERROR", error);
            console.log("NEW_POST data 출력(error)", data);
            setError("Something went wrong");
          })
          .finally(() => setIsLoading(false));
      }

      if (isEdit) {
        const targetId = originPost?.memberBoardId;

        dispatch(editProject({ targetId, data }))
          .unwrap()
          .then(() => {
            console.log("게시글 수정 성공", data);
            // 수정 성공하면 alert, 해당게시글로 이동
            window.alert("게시글이 수정되었습니다.");
            navigate(`/projectlist/${targetId}`);
          })
          .catch(error => {
            console.warn("EDIT PROJECT ERROR", error);
            console.log(data);
          });
      }
    }
  };

  return (
    <main className={classes.detail}>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className={classes.title}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className={classes.detailInfo}>
        <dl>
          <dt>프로젝트 예상기간</dt>
          <dd>
            <input type="date" value={startDate} onChange={handleStartDate} />
            <input type="date" value={endDate} onChange={handleEndDate} />
          </dd>
        </dl>
        <dl>
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
              placeholder="Enter"
              value={positionNumber}
              onChange={e => {
                setPositionNumber(e.target.value);
              }}
              onKeyUp={e => {
                const keyCode = e.keyCode;
                if (keyCode === 13) {
                  onCreateTag(position);
                }
              }}
            />
          </dd>
        </dl>
        <dl>
          <dt style={{ visibility: "hidden" }}>선택된 포지션 및 인원</dt>
          <dd className={classes.positionList}>
            <ul>
              {positionInfo.map(list => (
                <Tag
                  key={list}
                  type="KEYWORD_TAG"
                  text={list}
                  onDelete={handleDelete}
                />
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
        <ActionButton handleClick={handleSubmit}>
          {location.pathname.startsWith("/projectlist/edit") && "카드 수정하기"}
          {location.pathname.startsWith("/projectlist/new") && "카드 등록하기"}
        </ActionButton>
      </div>
    </main>
  );
};

export default PostEditor;
