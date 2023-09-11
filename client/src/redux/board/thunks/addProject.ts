import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "http://ec2-3-35-8-79.ap-northeast-2.compute.amazonaws.com:8080/";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IntiY3J5cHR9JDJhJDEwJDdrOEpzL1RSbm9ZaGZvR1lieGl5VWVHcG5lYTN5bHR6RldyMGQxQXRhSnlXaUo0ZHZQVzZxIiwicm9sZXMiOlsiVVNFUiJdLCJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInN1YiI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk0NDA4OTc0LCJleHAiOjE2OTQ0MTA3NzR9.4etMst7kfa0MC-Rr1ObdSER5pe2KFb507qKP7EIngqA",
};

interface dataType {
  title: string;
  content: string;
  status: string;
  position: string;
  startDate: string;
  endDate: string;
}

const addProject = createAsyncThunk("project/add", async (data: dataType) => {
  const response = await axios.post(`${baseUrl}memberboards`, data, {
    headers,
  });

  console.log(response.data);
  return response.data;
});

export { addProject };
