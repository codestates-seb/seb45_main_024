import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./validationSlice";
import signUpReducer from "./signUpSlice";

const store = configureStore({
  reducer: { validation: validationReducer, signUp: signUpReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
