import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { getTokensFromLocalStorage } from "../../utility/tokenStorage";
import { getStringDate } from "../../utility/formatDate";
import { extractTextAfterColon } from "../../utility/exceptColonFromTechResponse";

import { getProject } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./DetailContent.module.css";
import "./QuillEditor.css";
import GetLogo from "../mypage/format/GetLogo";

interface AccessTokenType {
  id: number;
}

const DetailContent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams() as { projectId: string };

  const { id } = getTokensFromLocalStorage() as AccessTokenType;

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(state => state.projects.currentData);
  const {
    title,
    content,
    writerId,
    writerNickName,
    techTagList,
    startDate,
    endDate,
    position,
    createdAt,
  } = currentProject || {};
  console.log("✅ CURRENT PROJECT", currentProject);

  // Format Date
  const createdDate = getStringDate(createdAt);
  const startDateString = getStringDate(startDate);
  const endDateString = getStringDate(endDate);

  const techTagNames = extractTextAfterColon(techTagList);

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
        <div className={classes.username}>{writerNickName}</div>
        <div className={classes.date}>{createdDate}</div>
        {id === writerId ? (
          <div
            className={classes.edit}
            onClick={() => {
              navigate(`/projectlist/edit/${projectId}`);
            }}
          >
            <EditSvg width="16" height="16" />
          </div>
        ) : null}
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
            <ul className={classes.techTags}>
              {techTagNames?.map(techName => {
                return (
                  <li key={techName} className={classes.techTag}>
                    <GetLogo logoTitle={techName} />
                  </li>
                );
              })}
            </ul>
          </dd>
        </dl>
      </div>
      <div className={classes.description}>
        <h3>프로젝트 소개</h3>
        <div
          className="quillEditor quillEditor_view"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      {id === writerId ? (
        <div className={classes.completeBtn}>
          <button>팀원모집완료</button>
          <p>
            팀원 모집이 완료되었다면, 버튼을 클릭하여 모집 상태를 변경해 주세요!
          </p>
        </div>
      ) : null}
    </section>
  );
};

export default DetailContent;
