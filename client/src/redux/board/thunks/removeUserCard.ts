import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { UserListDataType } from "../../../pages/userList/types";

const baseUrl =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";

const removeUserCard = createAsyncThunk(
  "usercard/remove",
  async (usercard: UserListDataType) => {
    await axios.delete(`${baseUrl}teamboard/${usercard.teamBoardId}`);

    console.log(usercard);
    return usercard;
  },
);

export { removeUserCard };
