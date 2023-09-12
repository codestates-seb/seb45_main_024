import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
}

const initialState: AlertState = {
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearAlertMessage: state => {
      state.message = "";
    }, // 얘는 나중에 모달 구현할 때 써먹으면 될듯?
  },
});

export const { setAlertMessage, clearAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
