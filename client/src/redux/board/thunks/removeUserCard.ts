import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../../utility/authInstance";

import { UserListDataType } from "../../../model/boardTypes";

const removeUserCard = createAsyncThunk(
  "usercard/remove",
  async (usercard: UserListDataType) => {
    await authInstance.delete(`teamboards/${usercard.teamBoardId}`);

    return usercard;
  },
);

export { removeUserCard };
