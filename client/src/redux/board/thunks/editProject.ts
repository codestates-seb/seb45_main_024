import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../utility/authInstance";

interface dataType {
  title: string;
  content: string;
  status: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface paramTypes {
  targetId: string;
  data: dataType;
}

const editProject = createAsyncThunk(
  "project/edit",
  async ({ targetId, data }: paramTypes) => {
    const response = await authInstance.patch(`memberboards/${targetId}`, data);

    return response.data;
  },
);

export { editProject };
