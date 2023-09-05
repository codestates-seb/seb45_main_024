import Checkbox from "../../components/userlist,projectlist/Checkbox";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/icons/delete.svg";
import classes from "./Detail.module.css";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import Tooltip from "../../components/userlist,projectlist/Tooltip";

const Detail = () => {
  return (
    <main>
      {/* 상세페이지 */}
      <section className={classes.detail}>
        <h2>
          여기는 프로젝트 제목이 들어가는 부분입니다. 제목이 만약에 두 줄 이상이
          되면 여기서 이렇게 내려갑니다.
        </h2>
        <div className={classes.meta}>
          <div className={classes.userImage}></div>
          <div className={classes.username}>유저ABC</div>
          <div className={classes.date}>2023.09.01</div>
          <div className={classes.edit}>
            <EditSvg width="16" height="16" />
          </div>
        </div>
        <div className={classes.detailInfo}>
          <dl>
            <dt>프로젝트 예상기간</dt>
            <dd>2023.10.01 ~ 2023.11.30</dd>
          </dl>
          <dl>
            <dt>포지션 및 인원</dt>
            <dd>프론트엔드 2명</dd>
          </dl>
          <dl>
            <dt>기술 스택</dt>
            <dd>JS TS React Node</dd>
          </dl>
        </div>
        <div className={classes.description}>
          <h3>프로젝트 소개</h3>
          <div>
            프로젝트 소개에 들어갈 내용은 작성자가 자유롭게 작성할 수 있지만
            placeholder 또는 가이드로 제시하면 좋을 것 같습니다. 프로젝트 목표,
            진행상황, 현재 팀 멤버, 최소한의 예상 기능 등 중앙선거관리위원회는
            법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을
            제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에
            관한 규칙을 제정할 수 있다. 평화통일정책의 수립에 관한 대통령의
            자문에 응하기 위하여 민주평화통일자문회의를 둘 수 있다. 국가는
            전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다. 대통령으로
            선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에
            달하여야 한다. 국회의원은 법률이 정하는 직을 겸할 수 없다. 대통령은
            법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.
          </div>
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

// <div className={classes.}></div>
