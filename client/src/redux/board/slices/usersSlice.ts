import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCard } from "../thunks/fetchUserCard";
import { getUserCard } from "../thunks/getUserCard";
import { addUserCard } from "../thunks/addUserCard";
import { editUserCard } from "../thunks/editUserCard";
import { removeUserCard } from "../thunks/removeUserCard";

import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

import { UserListDataType } from "../../../model/boardTypes";
interface UserState {
  data: UserListDataType[];
}

const initialState: UserState = {
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchUserCard.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(fetchUserCard.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUserCard.rejected, (state, action) => {
      state.data = dummyData.teamboards.data; // 서버 안될시 TEST
      console.log(state.data);
    });

    // Get
    builder.addCase(getUserCard.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(getUserCard.fulfilled, (state, action) => {
      // state.data = action.payload;
    });
    builder.addCase(getUserCard.rejected, (state, action) => {
      // state.data = dummyData.teamboards.data; // 서버 안될시 TEST
      // console.log(state.data);
    });

    // Add
    builder.addCase(addUserCard.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(addUserCard.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(addUserCard.rejected, (state, action) => {});

    // Edit
    builder.addCase(editUserCard.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(editUserCard.fulfilled, (state, action) => {
      console.log("SLICE", state.data, action.payload);
    });
    builder.addCase(editUserCard.rejected, (state, action) => {});

    // Remove
    builder.addCase(removeUserCard.fulfilled, (state, actino) => {
      state.data = state.data.filter(usercard => {
        return usercard.teamBoardId !== actino.payload.teamBoardId;
      });
    });
  },
});

export const usersReducer = usersSlice.reducer;
