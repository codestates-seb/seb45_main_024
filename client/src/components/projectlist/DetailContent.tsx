import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { getStringDate } from "../../util/formatDate";

import { getProject } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./DetailContent.module.css";

const DetailContent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams() as { projectId: string };

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(state => state.projects.currentData);
  const { title, content, startDate, endDate, position, createdAt } =
    currentProject;
  console.log("✅ CURRENT PROJECT", currentProject);

  // Format Date
  const createdDate = getStringDate(createdAt);
  const startDateString = getStringDate(startDate);
  const endDateString = getStringDate(endDate);

  // 기술스택 임시
  const stack = ["React", "JavaScipt"];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  /* Get Project */
  useEffect(() => {
    console.log("🚀 GET PROJECT");
    setIsLoading(true);
    setError(null);

    dispatch(getProject(projectId))
      .unwrap()
      .catch(error => {
        console.warn("🚀 GET PROJECT ERROR", error);
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, projectId]);

  return (
    <section className={classes.detail}>
      <h2>{title}</h2>
      <div className={classes.meta}>
        <div
          className={classes.userImage}
          onClick={() => navigate("/mypage/:accountId")}
        ></div>
        <div className={classes.username}>유저ABC</div>
        <div className={classes.date}>{createdDate}</div>
        <div
          className={classes.edit}
          onClick={() => {
            navigate(`/projectlist/edit/${projectId}`);
          }}
        >
          <EditSvg width="16" height="16" />
        </div>
      </div>
      <div className={classes.detailInfo}>
        <dl>
          <dt>프로젝트 예상기간</dt>
          <dd>
            {startDateString} ~ {endDateString}
          </dd>
        </dl>
        <dl>
          <dt>포지션 및 인원</dt>
          <dd>{position}</dd>
        </dl>
        <dl>
          <dt>기술 스택</dt>
          <dd>
            <ul>
              {stack.map(item => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </dd>
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
  );
};

export default DetailContent;
