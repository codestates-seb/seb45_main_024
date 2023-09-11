import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-3-35-8-79.ap-northeast-2.compute.amazonaws.com:8080/";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJDdrOEpzL1RSbm9ZaGZvR1lieGl5VWVHcG5lYTN5bHR6RldyMGQxQXRhSnlXaUo0ZHZQVzZxIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk0NDEzMDExLCJleHAiOjE2OTQ0MTQ4MTF9.5tIIkQdORmdQniBdEAG98HL6IsoyW5G9PvwfwQAl2uo",
};

interface dataType {
  title: string;
  content: string;
  status: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface paramTypes {
  targetId: number;
  data: dataType;
}

const editProject = createAsyncThunk(
  "project/edit",
  async ({ targetId, data }: paramTypes) => {
    const response = await axios.patch(
      `${baseUrl}memberboards/${targetId}`,
      data,
      { headers },
    );

    console.log(response.data);
    return response.data;
  },
);

export { editProject };
