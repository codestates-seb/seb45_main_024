import { useNavigate } from "react-router-dom";
import CardViewFront from "./CardViewFront";
import CardViewBack from "./CardViewBack";

import classes from "./CardStyle.module.css";

import {
  UserListDataType,
  ProjectListDataType,
} from "../../../model/boardTypes";

type CardDataType = UserListDataType | ProjectListDataType;

interface CardViewProps {
  type: "USER_CARD" | "PROJECT_CARD";
  cardData: CardDataType;
}

const CardView = ({ type, cardData }: CardViewProps) => {
  const isProjectCard = type === "PROJECT_CARD";
  const { memberBoardId } = cardData as ProjectListDataType;

  const navigate = useNavigate();

  return (
    <div
      className={`${classes.card} ${
        isProjectCard ? classes.project : classes.user
      }`}
      onClick={
        isProjectCard
          ? () => navigate(`/projectlist/${memberBoardId}`)
          : undefined
      }
    >
      <CardViewFront type={type} cardData={cardData} />
      {!isProjectCard && (
        <CardViewBack cardData={cardData as UserListDataType} />
      )}
    </div>
  );
};

export default CardView;
