import CardEdit from "./CardEdit";
import CardView from "./CardView";
import {
  UserListDataType,
  ProjectListDataType,
} from "../../../model/boardTypes";

import classes from "./CardStyle.module.css";

// 삭제 관련 thunks
// import { removeUserCard } from "../../../redux/board/thunks/removeUserCard";
// import { removeProject } from "../../../redux/board/thunks/removeProject";
// import { useAppDispatch } from "../../../redux/hooks";

type CardType = "USER_CARD" | "PROJECT_CARD";
type CardDataType = UserListDataType | ProjectListDataType;

interface CardProps {
  type: CardType;
  cardData: CardDataType;
  isEdit?: boolean;
}

const Card = ({ type, cardData, isEdit }: CardProps) => {
  // console.log("cardData", cardData);
  // const dispatch = useAppDispatch();

  /** REMOVE USER CARD TEST */
  /*
  const onRemoveUserCard = () => {
    console.log("🚀 카드 삭제하기", cardData);
    // setIsLoading(true);
    // setError(null);

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(removeUserCard(cardData as UserListDataType))
        .unwrap()
        .then(() => {
          console.log("성공", cardData);
          // 삭제가 성공하면 alert, 페이지 이동여부 확인
          window.alert("Card가 삭제되었습니다.");
          // navigate("/?");
        });
      // .catch(error => {
      //   console.warn("POST USERCARD ERROR", error);
      //   setError("Something went wrong");
      // })
      // .finally(() => setIsLoading(false));
    }
  };
  */

  /** REMOVE PROJECT CARD TEST */
  /*
  const onRemoveProjectCard = () => {
    console.log("🚀 카드 삭제하기", cardData);
    // setIsLoading(true);
    // setError(null);

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(removeProject(cardData as ProjectListDataType))
        .unwrap()
        .then(() => {
          console.log("성공", cardData);
          // 삭제가 성공하면 alert, 페이지 이동여부 확인
          // window.alert("Card가 삭제되었습니다.");
          // navigate("/?");
        });
      // .catch(error => {
      //   console.warn("POST USERCARD ERROR", error);
      //   setError("Something went wrong");
      // })
      // .finally(() => setIsLoading(false));
    }
  };
  */

  return (
    <li className={classes.cardWrapper}>
      {isEdit ? (
        <CardEdit cardData={cardData as UserListDataType} />
      ) : (
        <CardView cardData={cardData} type={type} />
      )}
    </li>
  );
};

export default Card;
