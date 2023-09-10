import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import { UserListDataType } from "../../../pages/userList/types";

const baseUrl =
  "http://ec2-13-125-206-62.ap-northeast-2.compute.amazonaws.com:8080/";

// interface dataType {
//   title: string;
//   position: string;
//   keywords: string[];
// }

const editUserCard = createAsyncThunk(
  "usercard/edit",
  async (targetId: number, data) => {
    const response = await axios.patch(
      `${baseUrl}teamboards/${targetId}`,
      data,
    );

    console.log(response.data);
    return response.data;
  },
);

export { editUserCard };
