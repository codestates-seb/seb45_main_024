import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./validationSlice";

const store = configureStore({
  reducer: { validation: validationReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
