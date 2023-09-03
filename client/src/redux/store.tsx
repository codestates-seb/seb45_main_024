import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./validationSlice";
import signUpReducer from "./signUpSlice";
import alertReducer from "./alertSlice";

const store = configureStore({
  reducer: {
    validation: validationReducer,
    signUp: signUpReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
