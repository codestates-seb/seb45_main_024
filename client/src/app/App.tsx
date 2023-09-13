import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/Root";
import ErrorPage from "../pages/Error";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/signup/SignUpPage";
import Main from "../pages/main/Main";

import Profile from "../pages/mypage/Profile";
import EditProfile from "../pages/mypage/EditProfile";
import Review from "../pages/mypage/Review";
import Summary from "../pages/mypage/Summary";
import MyInfo from "../pages/mypage/MyInfo";

import UserList from "../pages/userList/UserList";
import NewCard from "../pages/userList/NewCard";
import EditCard from "../pages/userList/EditCard";

import ProjectList from "../pages/projectList/ProjectList";
import Detail from "../pages/projectList/Detail";
import NewPost from "../pages/projectList/NewPost";
import EditPost from "../pages/projectList/EditPost";
import FindPasswordPage from "../pages/findPassword/findPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> },

      /*** 📌 로그인/회원가입 ***/
      {
        path: "/",
        children: [
          {
            path: "login",
            element: <LoginPage />,
            // children: [{ path: "findpassword", element: <FindPasswordPage /> }],
          },
          {
            path: "signup",
            element: <SignUpPage />,
          },
          {
            path: "findpassword",
            element: <FindPasswordPage />,
          },
        ],
      },

      /*** 📌 마이페이지 ***/
      {
        // path: "mypage/1",
        path: "mypage/:id",
        children: [
          { index: true, element: <Profile /> },
          { path: "edit", element: <EditProfile /> },
          { path: "review", element: <Review /> },
          { path: "summary", element: <Summary /> },
          { path: "myinfo", element: <MyInfo /> },
          //   path: "review",
          //   element: <Review />,
          //   children: [
          //     { index: true, element: <ReviewList /> },
          //     { path: "new", element: <NewReview /> },
          //   ],
          // },
        ],
      },

      /*** 📌 팀찾기 ***/
      {
        path: "userlist",
        children: [
          { index: true, element: <UserList /> },
          { path: "new", element: <NewCard /> },
          { path: "edit/:usercardId", element: <EditCard /> },
        ],
      },

      /*** 📌 팀원찾기 ***/
      {
        path: "projectlist",
        children: [
          { index: true, element: <ProjectList /> },
          { path: ":projectId", element: <Detail /> },
          { path: "new", element: <NewPost /> },
          { path: "edit/:projectId", element: <EditPost /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
