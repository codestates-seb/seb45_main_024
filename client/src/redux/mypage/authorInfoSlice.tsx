import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorInfoState {
  isAuthor: boolean;
  authorId: string | undefined;
  email: string | undefined;
  nickname: string | undefined;
  imgUrl: string | null;
}

const initialState: AuthorInfoState = {
  isAuthor: true,
  authorId: "",
  email: "",
  nickname: "",
  imgUrl: "",
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
