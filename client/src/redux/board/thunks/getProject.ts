import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-3-35-8-79.ap-northeast-2.compute.amazonaws.com:8080/";

const getProject = createAsyncThunk("project/get", async (targetId: number) => {
  const response = await axios.get(`${baseUrl}memberboards/${targetId}`);

  return response.data;
});

export { getProject };
