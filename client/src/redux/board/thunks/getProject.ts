import { createAsyncThunk } from "@reduxjs/toolkit";
import commonInstance from "../../../utility/commonInstance";

const getProject = createAsyncThunk("project/get", async (targetId: string) => {
  const response = await commonInstance.get(`memberboards/${targetId}`);

  return response.data;
});

export { getProject };
