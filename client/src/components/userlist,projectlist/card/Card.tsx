import classes from "./CardStyle.module.css";

import CardEdit from "./CardEdit";
import CardView from "./CardView";

import {
  UserListDataType,
  ProjectListDataType,
} from "../../../pages/userList/types";

// import { removeUserCard } from "../../../redux/board/thunks/removeUserCard";
// import { useAppDispatch } from "../../../redux/hooks";

type CardType = "USER_CARD" | "PROJECT_CARD";
type CardDataType = UserListDataType | ProjectListDataType;

interface CardProps {
  type: CardType;
  cardData: CardDataType;
  isEdit?: boolean;
}

const Card = ({ type, cardData, isEdit }: CardProps) => {
  console.log("cardData", cardData);
  // const dispatch = useAppDispatch();

  /** removeUserCard */
  // const onRemoveUserCard = () => {
  //   console.log("🚀 카드 삭제하기", cardData);
  //   // setIsLoading(true);
  //   // setError(null);

  //   dispatch(removeUserCard(cardData as UserListDataType))
  //     .unwrap()
  //     .then(() => {
  //       console.log("성공", cardData);
  //       // 삭제가 성공하면 alert, 페이지 이동여부 확인
  //       // window.alert("Card가 삭제되었습니다.");
  //       // navigate("/?");
  //     });
  //   // .catch(error => {
  //   //   console.warn("POST USERCARD ERROR", error);
  //   //   setError("Something went wrong");
  //   // })
  //   // .finally(() => setIsLoading(false));
  // };

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
