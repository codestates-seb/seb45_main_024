import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./auth/validationSlice";
import signUpReducer from "./auth/signUpSlice";
import loginReducer from "./auth/loginSlice";
import alertReducer from "./utility/alertSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    validation: validationReducer,
    signUp: signUpReducer,
    login: loginReducer,
    alert: alertReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
