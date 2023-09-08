// import React, { useState } from "react";
import classes from "./CardStyle.module.css";

import CardEdit from "./CardEdit";
import CardView from "./CardView";

import {
  UserListDataType,
  ProjectListDataType,
} from "../../../pages/userList/types";

type CardType = "USER_CARD" | "PROJECT_CARD";
type CardDataType = UserListDataType | ProjectListDataType;

interface CardProps {
  type: CardType;
  cardData: CardDataType;
  isEdit?: boolean;
}

const Card = ({ type, cardData, isEdit }: CardProps) => {
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
