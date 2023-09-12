import { createSlice } from "@reduxjs/toolkit";

import { fetchProjectList } from "../thunks/fetchProjectList";
import { getProject } from "../thunks/getProject";
import { addProject } from "../thunks/addProject";
import { editProject } from "../thunks/editProject";
import { removeProject } from "../thunks/removeProject";

import { ProjectListDataType } from "../../../model/boardTypes";

import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

interface ProjectState {
  data: ProjectListDataType[];
  currentData: ProjectListDataType[];
}

const initialState: ProjectState = {
  data: [],
  currentData: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchProjectList.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchProjectList.rejected, (state, action) => {
      state.data = dummyData.memberboards.data; // 서버 안될시 TEST
      // console.log(state.data);
    });

    // Get
    builder.addCase(getProject.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.currentData = action.payload;
    });
    builder.addCase(getProject.rejected, (state, action) => {
      state.currentData = dummyData.memberboards.data[0]; // 서버 안될시 TEST
      console.log("action.payload", action.payload);
    });

    // Add
    builder.addCase(addProject.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(addProject.rejected, (state, action) => {});

    // Edit
    builder.addCase(editProject.pending, (state, action) => {
      throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(editProject.fulfilled, (state, action) => {
      console.log("projectSlice FULFILLED");
      console.log(state.data);
    });
    builder.addCase(editProject.rejected, (state, action) => {
      console.log("projectsSlice REJECTED");
    });

    // Remove
    builder.addCase(removeProject.fulfilled, (state, actino) => {
      state.data = state.data.filter(projectCard => {
        return projectCard.memberBoardId !== actino.payload.memberBoardId;
      });
    });
  },
});

export const projectsReducer = projectsSlice.reducer;
