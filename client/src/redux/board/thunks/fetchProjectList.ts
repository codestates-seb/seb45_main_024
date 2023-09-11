import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-3-35-8-79.ap-northeast-2.compute.amazonaws.com:8080/";

const fetchProjectList = createAsyncThunk("projectlist/fetch", async () => {
  const response = await axios.get(`${baseUrl}memberboards/?page=1`);

  return response.data.data;
});

export { fetchProjectList };
