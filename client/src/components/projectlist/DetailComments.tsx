import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/icons/delete.svg";

import Checkbox from "../../components/userlist,projectlist/Checkbox";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Tooltip from "../../components/userlist,projectlist/Tooltip";

import { addComment, removeComment } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import classes from "./DetailComments.module.css";

const DetailComments = () => {
  const { projectId } = useParams() as { projectId: string };

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(state => state.projects.currentData);

  const { replyList: comments } = currentProject || {};

  console.log("replyList", comments);

  // 댓글 등록
  const [content, setContent] = useState("");
  // const [isApply, setIsApply] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const data = {
    content: content,
    isApply: isChecked,
    memberBoardId: projectId,
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  /* Add Comment */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addComment(data))
      .unwrap()
      .then(() => {
        console.log("🚀 CREATE 성공", data);
        window.alert("댓글이 등록되었습니다.");
        window.location.reload();
      })
      .catch(error => {
        console.warn("🚀 CREATE 실패", error, data);
      })
      .finally();
  };

  /* Remove Comment */
  // onRemoveUserCard
  const handleClickDelete = () => {
    // console.log("🚀 카드 삭제하기", cardData);
    // // setIsLoading(true);
    // // setError(null);
    // if (window.confirm("정말로 삭제하시겠습니까?")) {
    //   dispatch(removeUserCard(cardData as UserListDataType))
    //     .unwrap()
    //     .then(() => {
    //       console.log("성공", cardData);
    //       // 삭제가 성공하면 alert, 페이지 이동여부 확인
    //       window.alert("Card가 삭제되었습니다.");
    //       // navigate("/?");
    //     });
    //   // .catch(error => {
    //   //   console.warn("POST USERCARD ERROR", error);
    //   //   setError("Something went wrong");
    //   // })
    //   // .finally(() => setIsLoading(false));
    // }
  };

  return (
    <section className={classes.comments}>
      <h4>댓글</h4>
      <form className={classes.writeArea} onSubmit={handleSubmit}>
        <textarea
          placeholder="댓글을 남겨주세요!"
          onChange={handleChangeComment}
          value={content}
        ></textarea>
        <div className={classes.submitBtn}>
          <Checkbox
            title="apply"
            text="프로젝트 지원 댓글"
            infoText={true}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          <ActionButton buttonType="submit">댓글 등록하기</ActionButton>
        </div>
      </form>
      <ul className={classes.commentsArea}>
        {comments?.map(comment => (
          // key는 임시. 고유한걸로 바꿔야 함
          <li key={Math.random()} className={classes.comment}>
            <div className={classes.meta}>
              <div className={classes.userImage}></div>
              <div className={classes.usernameAndDate}>
                <div className={classes.username}>{comment.writerNickName}</div>
                {/* <div className={classes.date}>2023-09-05 20:24</div> */}
                <div className={classes.date}>
                  {new Date(comment.createAt).toLocaleString()}
                </div>
              </div>
              <div className={classes.editArea}>
                <div className={classes.edit}>
                  <EditSvg width="16" height="16" />
                </div>
                <div className={classes.delete} onClick={handleClickDelete}>
                  <DeleteSvg width="16" height="16" />
                </div>
              </div>
            </div>
            <div className={classes.contents}>
              <div className={classes.content}>{comment.content}</div>
              {comment.apply && (
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
              )}
            </div>
          </li>
        ))}

        {/* 임시댓글 */}
        <hr />
        {/* <li className={classes.comment}>
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
        </li> */}
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
  );
};

export default DetailComments;
