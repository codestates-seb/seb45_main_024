import { createAsyncThunk } from "@reduxjs/toolkit";
import commonInstance from "../../utility/commonInstance";

const fetchProjectList = createAsyncThunk("projectlist/fetch", async () => {
  const response = await commonInstance.get(`memberboards/?page=1`);

  return response.data.data;
});

export { fetchProjectList };
