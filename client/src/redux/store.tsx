import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./auth/validationSlice";
import signUpReducer from "./auth/signUpSlice";
import loginReducer from "./auth/loginSlice";
import alertReducer from "./utility/alertSlice";

import { usersReducer } from "./board/slices/usersSlice";

const store = configureStore({
  reducer: {
    validation: validationReducer,
    signUp: signUpReducer,
    login: loginReducer,
    alert: alertReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { fetchUserCard } from "./board/thunks/fetchUserCard";
export { getUserCard } from "./board/thunks/getUserCard";
export { addUserCard } from "./board/thunks/addUserCard";
export { editUserCard } from "./board/thunks/editUserCard";
export { removeUserCard } from "./board/thunks/removeUserCard";

export default store;
