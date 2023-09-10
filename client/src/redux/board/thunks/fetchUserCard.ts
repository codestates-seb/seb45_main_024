import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";

const fetchUserCard = createAsyncThunk("userlist/fetch", async () => {
  const response = await axios.get(`${baseUrl}teamboards/?page=1`);

  // const totalElements = response.pageInfo.totalElements; // 이것도 같이 return?

  return response.data.data;
});

export { fetchUserCard };
