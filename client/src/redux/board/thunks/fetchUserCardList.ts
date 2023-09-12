import { createAsyncThunk } from "@reduxjs/toolkit";
import commonInstance from "../../../utility/commonInstance";

const fetchUserCardList = createAsyncThunk("userlist/fetch", async () => {
  const response = await commonInstance.get(`teamboards/?page=1`);

  return response.data.data;
});

export { fetchUserCardList };
