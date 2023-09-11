import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/icons/delete.svg";
import Checkbox from "../../components/userlist,projectlist/Checkbox";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Tooltip from "../../components/userlist,projectlist/Tooltip";
import { ProjectListDataType } from "../../model/boardTypes";

import { getProject } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./Detail.module.css";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const paramId = parseInt(id);
  // console.log(id);

  const dispatch = useAppDispatch();
  // const projectData = useAppSelector(state => state.projects.data[0]);
  // const projectList = useAppSelector(state => state.projects.data);
  // console.log(projectList);

  const currentProject = useAppSelector(state => state.projects.currentData);
  // console.log("currentProject", currentProject);
  const { title, content, startDate, endDate, position, createdAt } =
    currentProject;

  // const [project, setProject] = useState<ProjectListDataType>();
  // console.log(project);

  /* Get Project */
  /* 기존 리스트에서 가져오는 방법
  useEffect(() => {
    if (projectList.length >= 1) {
      const targetProject = projectList.find(
        item => item.memberBoardId === paramId,
      );
      if (targetProject) {
        setProject(targetProject);
      } else {
        alert("없는 게시글입니다!");
        navigate("/projectlist", { replace: true });
      }
    }
  }, [paramId, projectList]);
  */

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  /* Get Project */
  // 새롭게 요청
  useEffect(() => {
    console.log("🚀 GET PROJECT");
    setIsLoading(true);
    setError(null);

    dispatch(getProject(paramId))
      .unwrap()
      .then(() => {
        console.log("GET 프로젝트 성공");
      })
      .catch(error => {
        console.warn("GET PROJECT ERROR", error);
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  // const { title, content, startDate, endDate, position, createdAt } = project;

  // TODO: 날짜 포맷팅 함수 따로 빼놓기 (공통 부분 많음)
  const getStringDate = (date: string) => {
    return new Date(date).toLocaleDateString(); // YYYY.MM.DD
  };
  const date = getStringDate(createdAt);
  const startDateGetString = getStringDate(startDate);
  const endDateGetString = getStringDate(endDate);

  return (
    <main>
      {/* 상세페이지 */}
      <section className={classes.detail}>
        <h2>{title}</h2>
        <div className={classes.meta}>
          <div className={classes.userImage}></div>
          <div className={classes.username}>유저ABC</div>
          <div className={classes.date}>{date}</div>
          <div
            className={classes.edit}
            onClick={() => {
              navigate(`/projectlist/edit/${id}`);
            }}
          >
            <EditSvg width="16" height="16" />
          </div>
        </div>
        <div className={classes.detailInfo}>
          <dl>
            <dt>프로젝트 예상기간</dt>
            <dd>
              {startDateGetString} ~ {endDateGetString}
            </dd>
          </dl>
          <dl>
            <dt>포지션 및 인원</dt>
            <dd>{position}</dd>
          </dl>
          <dl>
            <dt>기술 스택</dt>
            <dd>JS TS React Node</dd>
          </dl>
        </div>
        <div className={classes.description}>
          <h3>프로젝트 소개</h3>
          <div>{content}</div>
        </div>
        <div className={classes.completeBtn}>
          <button>팀원모집완료</button>
          <p>
            팀원 모집이 완료되었다면, 버튼을 클릭하여 모집 상태를 변경해 주세요!
          </p>
        </div>
      </section>

      {/* 댓글영역 */}
      <section className={classes.comments}>
        <h4>댓글</h4>
        <div className={classes.writeArea}>
          <textarea placeholder="댓글을 남겨주세요!"></textarea>
          <div className={classes.submitBtn}>
            <Checkbox title="apply" text="프로젝트 지원 댓글" infoText={true} />
            <ActionButton handleClick={() => console.log("BTN CLICKED!")}>
              댓글 등록하기
            </ActionButton>
          </div>
        </div>
        <ul className={classes.commentsArea}>
          <li className={classes.comment}>
            <div className={classes.meta}>
              <div className={classes.userImage}></div>
              <div className={classes.usernameAndDate}>
                <div className={classes.username}>유저BBB</div>
                <div className={classes.date}>2023-09-05 20:24</div>
              </div>
              <div className={classes.editArea}>
                <div className={classes.edit}>
                  <EditSvg width="16" height="16" />
                </div>
                <div className={classes.delete}>
                  <DeleteSvg width="16" height="16" />
                </div>
              </div>
            </div>
            <div className={classes.contents}>
              <div className={classes.content}>
                저와 딱 맞는 프로젝트에요! 함께하고 싶어요. 지원합니다!
              </div>
              <div className={classes.acceptArea}>
                <ActionButton
                  type="outline"
                  handleClick={() => console.log("BTN CLICKED!")}
                >
                  수락하기
                </ActionButton>
                <ActionButton
                  type="outline"
                  handleClick={() => console.log("BTN CLICKED!")}
                >
                  거절하기
                </ActionButton>
              </div>
            </div>
          </li>
          <li className={classes.comment}>
            <div className={classes.meta}>
              <div className={classes.userImage}></div>
              <div className={classes.usernameAndDate}>
                <div className={classes.username}>유저BBB</div>
                <div className={classes.date}>2023-09-05 20:24</div>
              </div>
              <div className={classes.editArea}>
                <div className={classes.edit}>
                  <EditSvg width="16" height="16" />
                </div>
                <div className={classes.delete}>
                  <DeleteSvg width="16" height="16" />
                </div>
              </div>
            </div>
            <div className={classes.contents}>
              <div className={classes.content}>
                저와 딱 맞는 프로젝트에요! 함께하고 싶어요. 지원합니다!
              </div>
              <div className={classes.acceptArea}>
                <Tooltip type="APPROVE">팀원으로 수락한 유저입니다.</Tooltip>
                {/* <Tooltip type="REJECT">팀원으로 거절한 유저입니다.</Tooltip> */}
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Detail;
