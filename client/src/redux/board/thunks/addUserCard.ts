import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../../utility/authInstance";

interface dataType {
  title: string;
  position: string;
  keywords: string[];
}

const addUserCard = createAsyncThunk("usercard/add", async (data: dataType) => {
  const response = await authInstance.post(`teamboards`, data);

  return response.data;
});

export { addUserCard };
