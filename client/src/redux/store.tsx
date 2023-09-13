import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./auth/validationSlice";
import loginReducer from "./auth/loginSlice";
import alertReducer from "./common/alertSlice";
import loadingReducer from "./common/loadingSlice";
import menuReducer from "./mypage/menuSlice";
import authorInfoReducer from "./mypage/authorInfoSlice";
import profileReducer from "./mypage/profileSlice";
import { usersReducer, getNewTitle } from "./board/slices/usersSlice";
import { projectsReducer } from "./board/slices/projectsSlice";

const store = configureStore({
  reducer: {
    validation: validationReducer,
    login: loginReducer,
    alert: alertReducer,
    loading: loadingReducer,
    menu: menuReducer,
    authorInfo: authorInfoReducer,
    profile: profileReducer,
    users: usersReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { fetchUserCardList } from "./board/thunks/fetchUserCardList";
export { getUserCard } from "./board/thunks/getUserCard";
export { addUserCard } from "./board/thunks/addUserCard";
export { editUserCard } from "./board/thunks/editUserCard";
export { removeUserCard } from "./board/thunks/removeUserCard";

export { fetchProjectList } from "./board/thunks/fetchProjectList";
export { getProject } from "./board/thunks/getProject";
export { addProject } from "./board/thunks/addProject";
export { editProject } from "./board/thunks/editProject";

export { getNewTitle };

export default store;
