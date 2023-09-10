import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";

interface dataType {
  title: string;
  position: string;
  keywords: string[];
}

const addUserCard = createAsyncThunk("usercard/add", async (data: dataType) => {
  const response = await axios.post(`${baseUrl}teamboards`, data);

  console.log(response.data);
  return response.data;
});

export { addUserCard };
