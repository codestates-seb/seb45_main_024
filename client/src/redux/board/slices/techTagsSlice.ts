import { createSlice } from "@reduxjs/toolkit";
import { fetchTechTags } from "../thunks/techTagsThunks";

// import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

type TagType = "BACK_END" | "FRONT_END" | "MOBILE" | "ETC";

interface TechTagType {
  id: number;
  techName: string;
  tagType: TagType;
}

interface TechTagsState {
  data: TechTagType[];
}

const initialState: TechTagsState = {
  data: [],
};

const techTagsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchTechTags.pending, () => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(fetchTechTags.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchTechTags.rejected, () => {
      // state.data = dummyData["tags/tech"].data; // 서버 안될시 TEST
    });
  },
});

export const techTagsReducer = techTagsSlice.reducer;
