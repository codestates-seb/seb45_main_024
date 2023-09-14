import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileData {
  imageUrl: string | null;
  email: string | null;
  nickname: string | null;
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
// interface ProfileState {
//   imageUrl: string | null;
//   email: string | null;
//   nickname: string | null;
//   coverLetter: string | null;
//   softSkills: { techName: string }[];
//   hardSkills: { techName: string }[];
//   projectDetails: {
//     projectTitle: string | null;
//     projectUrl: string | null;
//     imageUrl: string | null;
//   }[];
//   status: "idle" | "loading" | "failed";
// }

const initialState: ProfileState = {
  profileData: null,
  status: "idle",
};
// const initialState: ProfileState = {
//   imageUrl: null,
//   email: null,
//   nickname: null,
//   coverLetter: null,
//   softSkills: [],
//   hardSkills: [],
//   projectDetails: [],
//   status: "idle",
// };

// export const fetchProfileData = createAsyncThunk(
//   "profile/fetchProfileData",
//   async (authorId: string) => {
//     const response = await authInstance.get(`/mypages/profile/${authorId}`);
//     return response.data;
//   },
// );

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
