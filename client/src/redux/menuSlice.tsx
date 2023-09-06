import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { selectedMenu: "Summary" },
  reducers: {
    changeMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { changeMenu } = menuSlice.actions;
export default menuSlice.reducer;
