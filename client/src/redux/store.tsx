import { configureStore } from "@reduxjs/toolkit";
// import validationReducer from "./validationSlice";
import menuReducer from "./menuSlice";

const store = configureStore({
  // reducer: { validation: validationReducer, menu: menuReducer },
  reducer: { menu: menuReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
