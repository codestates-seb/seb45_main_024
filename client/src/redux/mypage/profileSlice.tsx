import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../utility/authInstance";

interface ProfileDataState {
  imageUrl: string | null;
  email: string | null;
  nickname: string | null;
  coverLetter: string | null;
  softSkills: { techName: string }[];
  hardSkills: { techName: string }[];
  projectDetails: {
    projectTitle: string | null;
    projectUrl: string | null;
    imageUrl: string | null;
  }[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProfileDataState = {
  imageUrl: null,
  email: null,
  nickname: null,
  coverLetter: null,
  softSkills: [],
  hardSkills: [],
  projectDetails: [],
  status: "idle",
};

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (authorId: string) => {
    const response = await authInstance.get(`/mypages/profile/${authorId}`);
    return response.data;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfileData.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "idle";
        return { ...state, ...action.payload };
      })
      .addCase(fetchProfileData.rejected, state => {
        state.status = "failed";
      });
  },
});

export default profileSlice.reducer;
