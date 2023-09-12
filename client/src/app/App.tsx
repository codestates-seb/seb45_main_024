import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/Root";
import ErrorPage from "../pages/Error";

import Main from "../pages/main/Main";

import Mypage from "../pages/mypage/Mypage";
import EditProfile from "../pages/mypage/EditProfile";

import UserList from "../pages/userList/UserList";
import NewCard from "../pages/userList/NewCard";
import EditCard from "../pages/userList/EditCard";

import ProjectList from "../pages/projectList/ProjectList";
import Detail from "../pages/projectList/Detail";
import NewPost from "../pages/projectList/NewPost";
import EditPost from "../pages/projectList/EditPost";

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
            // element: <Login />,
            // children: [{ path: "findpassword", element: <PAGE /> }],
          },
          {
            path: "signup",
            // element: <Signup />,
          },
        ],
      },

      /*** 📌 마이페이지 ***/
      {
        // path: "mypage/1",
        path: "mypage/:id",
        children: [
          { index: true, element: <Mypage /> },
          { path: "edit", element: <EditProfile /> },
          // {
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
          { path: "edit/:id", element: <EditCard /> },
        ],
      },

      /*** 📌 팀원찾기 ***/
      {
        path: "projectlist",
        children: [
          { index: true, element: <ProjectList /> },
          { path: ":id", element: <Detail /> },
          { path: "new", element: <NewPost /> },
          { path: "edit/:id", element: <EditPost /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
