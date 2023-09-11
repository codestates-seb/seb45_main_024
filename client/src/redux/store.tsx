import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./auth/validationSlice";
import loginReducer from "./auth/loginSlice";
import alertReducer from "./utility/alertSlice";
import loadingReducer from "./utility/loadingSlice";

const store = configureStore({
  reducer: {
    validation: validationReducer,
    login: loginReducer,
    alert: alertReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
