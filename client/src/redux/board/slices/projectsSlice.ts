import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjectList,
  getProject,
  addProject,
  editProject,
  removeProject,
} from "../thunks/projectsThunks";

import { ProjectListDataType } from "../../../model/boardTypes";

import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

interface ProjectState {
  data: ProjectListDataType[];
  currentData: ProjectListDataType | null;
}

const initialState: ProjectState = {
  data: [],
  currentData: null,
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
      console.log("✅ EDIT PROJECT FULFILLED");
    });
    builder.addCase(editProject.rejected, (state, action) => {
      console.log("✅ EDIT PROJECT REJECTED");
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
