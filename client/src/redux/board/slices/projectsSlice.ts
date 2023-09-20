import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjectList,
  getProject,
  addProject,
  editProject,
  removeProject,
} from "../thunks/projectsThunks";

import { ProjectListDataType, PageInfo } from "../../../model/boardTypes";

import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

interface ProjectSliceType {
  data: ProjectListDataType[];
  currentData?: ProjectListDataType;
  pageInfo: PageInfo;
}

const initialState: ProjectSliceType = {
  data: [],
  pageInfo: {
    page: 1,
    size: 8,
    totalElements: 0,
    totalpages: 0,
  },
};

// const initialState: ProjectListResponse = {
//   data: [],
//   pageInfo: {
//     page: 1,
//     size: 8,
//     totalElements: 0,
//     totalpages: 0,
//   },
// };

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchProjectList.pending, () => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      state.data = action.payload.listData;
      state.pageInfo = action.payload.pageInfo;
    });
    builder.addCase(fetchProjectList.rejected, () => {
      // state.data = dummyData.memberboards.data; // 서버 안될시 TEST
    });

    // Get
    builder.addCase(getProject.pending, (state, action) => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.currentData = action.payload;
    });
    builder.addCase(getProject.rejected, (state, action) => {
      // state.currentData = dummyData.memberboards.data[0]; // 서버 안될시 TEST
    });

    // Add
    builder.addCase(addProject.pending, (state, action) => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(addProject.rejected, (state, action) => {});

    // Edit
    builder.addCase(editProject.pending, (state, action) => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(editProject.fulfilled, (state, action) => {
      // console.log("✅ EDIT PROJECT FULFILLED");
    });
    builder.addCase(editProject.rejected, (state, action) => {
      // console.log("✅ EDIT PROJECT REJECTED");
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
