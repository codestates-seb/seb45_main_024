import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
/* 임시 라우팅 처리 */
import Main from "../pages/main/Main";
import UserList from "../pages/userList/UserList";
import Mypage from "../pages/mypage/Mypage";
// import SignUpPage from "../pages/signup/SignUpPage";
// import ComponentName from "../pages/";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/userlist" element={<UserList />}></Route>
            {/* <Route path="/signup" element={<SignUpPage />}></Route> */}
            <Route path="/mypage" element={<Mypage />}></Route>
            {/* <Route path="/" element={<ComponentName />}></Route>  */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
