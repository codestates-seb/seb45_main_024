import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../utility/authInstance";

// import { UserListDataType } from "../../../pages/userList/types";

interface dataType {
  title: string;
  position: string;
  keywords: string[];
}

interface paramTypes {
  targetId: number;
  data: dataType;
}

const editUserCard = createAsyncThunk(
  "usercard/edit",
  async ({ targetId, data }: paramTypes) => {
    const response = await authInstance.patch(`teamboards/${targetId}`, data);

    return response.data;
  },
);

export { editUserCard };
