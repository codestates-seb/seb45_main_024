// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardViewFront from "./CardViewFront";
import CardViewBack from "./CardViewBack";
// import classes from "./CardView.module.css";
import classes from "./CardStyle.module.css";

import {
  UserListDataType,
  ProjectListDataType,
} from "../../../pages/userList/types";

type CardDataType = UserListDataType | ProjectListDataType;

interface CardViewProps {
  type: "USER_CARD" | "PROJECT_CARD";
  cardData: CardDataType;
}

const CardView = ({ type, cardData }: CardViewProps) => {
  const isPorjectCard = type === "PROJECT_CARD";
  // console.log("type", type);
  // console.log("cardData", cardData);
  // const { title, position, keywords, createdAt } = cardData;

  // const date: string = new Date(createdAt).toLocaleDateString();

  // 임시 기술스택
  // const stack = ["Javascript", "React"];

  // const [editTitle, setEditTitle] = useState("");
  // const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditTitle(e.target.value);
  // };

  // console.log("🚀 EDITDATA: ", editTitle);

  const navigate = useNavigate();

  return (
    <div
      className={`${classes.card} ${
        isPorjectCard ? classes.project : classes.user
        // isPorjectCard ? "project" : "user"
      }`}
      onClick={isPorjectCard ? () => navigate(":detailPageId") : undefined}
    >
      <CardViewFront type={type} cardData={cardData} />
      {!isPorjectCard && <CardViewBack cardData={cardData} />}
    </div>
  );
};

export default CardView;
