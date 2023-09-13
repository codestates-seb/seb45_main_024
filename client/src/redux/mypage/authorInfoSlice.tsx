import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorInfoState {
  isAuthor: boolean;
  visitorId: string | null;
  ownerId: string | null;
  username: string | null;
}

const initialState: AuthorInfoState = {
  isAuthor: true,
  visitorId: null,
  ownerId: null,
  username: null,
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
