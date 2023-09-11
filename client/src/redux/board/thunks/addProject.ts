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

const addProject = createAsyncThunk("project/add", async (data: dataType) => {
  const response = await authInstance.post(`memberboards`, data);

  return response.data;
});

export { addProject };
