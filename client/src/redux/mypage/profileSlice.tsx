import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileData {
  imageUrl: string | null;
  email: string | null;
  nickname: string | null;
  techTags: {
    id: number;
    techName: string;
    tagType: string;
  }[];
  coverLetter: string | null;
  softSkills: string[];
  hardSkills: string[];
  projectDetails: {
    projectTitle: string | null;
    projectUrl: string | null;
    imageUrl: string | null;
  }[];
  status: "idle" | "loading" | "failed";
}

export interface ProfileState {
  profileData?: ProfileData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProfileState = {
  profileData: null,
  status: "idle",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<any>) => {
      state.profileData = action.payload;
      state.status = "idle";
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
