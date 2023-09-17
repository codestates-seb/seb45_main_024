import { createAsyncThunk } from "@reduxjs/toolkit";
import commonInstance from "../../../utility/commonInstance";
// import authInstance from "../../../utility/authInstance";

/** GET 모든 기술태그 조회 */
const fetchTechTags = createAsyncThunk("techTags/fetch", async () => {
  const response = await commonInstance.get("tags/tech");

  return response.data;
});

export { fetchTechTags };
