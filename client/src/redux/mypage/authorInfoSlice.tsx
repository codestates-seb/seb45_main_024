import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorInfoState {
  isAuthor: boolean;
  visitorId: string | null;
  ownerId: string | undefined;
  email: string | undefined;
  nickname: string | undefined;
}

const initialState: AuthorInfoState = {
  isAuthor: true,
  visitorId: "",
  ownerId: "",
  email: "",
  nickname: "",
};

const authorInfoSlice = createSlice({
  name: "authorInfo",
  initialState,
  reducers: {
    setAuthorInfo(state, action: PayloadAction<AuthorInfoState>) {
      return action.payload;
    },
  },
});

export const { setAuthorInfo } = authorInfoSlice.actions;
export default authorInfoSlice.reducer;
