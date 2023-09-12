import { createSlice } from "@reduxjs/toolkit";
import {
  getComments,
  addComment,
  editComment,
  removeComment,
} from "../thunks/commentsThunks";

import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

const initialState = {
  data: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET
    builder.addCase(getComments.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      // state.data = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      // state.data = dummyData.teamboards.data; // 서버 안될시 TEST
    });

    // ADD
    builder.addCase(addComment.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
      console.log("✅ ADD TEST PENDING");
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.data.push(action.payload);
      console.log("✅ ADD TEST FULFILLED");
    });
    builder.addCase(addComment.rejected, (state, action) => {
      console.log(action.payload);
      console.log("✅ ADD TEST REJECTED");
    });

    // EDIT
    builder.addCase(editComment.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      console.log("✅ EDIT USER FULFILLED");
    });
    builder.addCase(editComment.rejected, (state, action) => {
      console.log("✅ EDIT USER REJECTED");
    });

    // REMOVE
    builder.addCase(removeComment.fulfilled, (state, actino) => {
      // state.data = state.data.filter(usercard => {
      //   return usercard.teamBoardId !== actino.payload.teamBoardId;
      // });
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
