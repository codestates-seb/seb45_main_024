import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  nicknameError: false,
  emailError: false,
  passwordError: false,
  confirmPasswordError: false,
};

const validationSlice = createSlice({
  name: "validation",
  initialState: initialState,
  reducers: {
    validEmail: (state, action) => {
      const email = action.payload;
      if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        state.emailError = true;
      } else {
        state.emailError = false;
      }
    },
    validNickname: (state, action) => {
      const nickname = action.payload;
      if (!nickname.match(/^.{2,7}$/)) {
        state.nicknameError = true;
      } else {
        state.nicknameError = false;
      }
    },
    validPassword: (state, action) => {
      const password = action.payload;
      if (!password.match(/^.{5,}$/)) {
        state.passwordError = true;
      } else {
        state.passwordError = false;
      }
    },
    coinCidePassword: (state, action) => {
      const confirmPassword = action.payload;
      if (confirmPassword !== state.password) {
        state.confirmPasswordError = true;
      } else {
        state.confirmPasswordError = false;
      }
    },
  },
});

export const validationActions = validationSlice.actions;

export default validationSlice.reducer;
