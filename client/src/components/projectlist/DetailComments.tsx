import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/icons/delete.svg";

import Checkbox from "../../components/userlist,projectlist/Checkbox";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Tooltip from "../../components/userlist,projectlist/Tooltip";

import classes from "./DetailComments.module.css";

const DetailComments = () => {
  return (
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
  );
};

export default DetailComments;
