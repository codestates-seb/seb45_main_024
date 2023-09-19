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
import { commentsReducer } from "./board/slices/commentsSlice";
import { techTagsReducer } from "./board/slices/techTagsSlice";

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
    comments: commentsReducer,
    techTags: techTagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  fetchUserCardList,
  getUserCard,
  addUserCard,
  editUserCard,
  removeUserCard,
} from "./board/thunks/userCardThunks";

export {
  fetchProjectList,
  getProject,
  addProject,
  editProject,
  removeProject,
} from "./board/thunks/projectsThunks";

export {
  getComments,
  addComment,
  editComment,
  removeComment,
} from "./board/thunks/commentsThunks";

export { fetchTechTags } from "./board/thunks/techTagsThunks";

export { getNewTitle };

export default store;
