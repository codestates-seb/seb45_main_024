import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";

// interface dataType {
//   title: string;
//   position: string;
//   keywords: string[];
// }

const getUserCard = createAsyncThunk(
  "usercard/get",
  async (targetId: number) => {
    const response = await axios.get(`${baseUrl}teamboards/${targetId}`);

    console.log(response.data);
    return response.data;
  },
);

export { getUserCard };
