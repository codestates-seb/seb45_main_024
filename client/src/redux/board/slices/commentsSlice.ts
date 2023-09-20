import { createSlice } from "@reduxjs/toolkit";
import {
  getComments,
  addComment,
  editComment,
  removeComment,
} from "../thunks/commentsThunks";

// import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

const initialState = {
  data: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET
    builder.addCase(getComments.pending, () => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(getComments.fulfilled, () => {
      // state.data = action.payload;
    });
    builder.addCase(getComments.rejected, () => {
      // state.data = dummyData.teamboards.data; // 서버 안될시 TEST
    });

    // ADD
    builder.addCase(addComment.pending, () => {
      // throw new Error(); // 서버 안될시 TEST
      // console.log("✅ ADD TEST PENDING");
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.data.push(action.payload);
      // console.log("✅ ADD COMMENT FULFILLED");
    });
    builder.addCase(addComment.rejected, () => {
      // console.log("✅ ADD COMMENT REJECTED");
    });

    // EDIT
    builder.addCase(editComment.pending, () => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(editComment.fulfilled, (_, action) => {
      console.log(action.payload);
      // console.log("✅ EDIT COMMENT FULFILLED");
    });
    builder.addCase(editComment.rejected, () => {
      // console.log("✅ EDIT COMMENT REJECTED");
    });

    // REMOVE
    builder.addCase(removeComment.fulfilled, () => {
      // console.log(state.data);
      // console.log(action.payload);
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
