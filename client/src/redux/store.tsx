import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./validationSlice";

const store = configureStore({
  reducer: { validation: validationReducer },
});

export default store;
