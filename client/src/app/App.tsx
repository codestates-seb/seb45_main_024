import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
/* 임시 라우팅 처리 */
import Main from "../pages/main/Main";
import ProjectList from "../pages/projectList/Detail";
// import ComponentName from "../pages/";
// import ComponentName from "../pages/";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/userlist" element={<ProjectList />}></Route>
            {/* <Route path="/" element={<ComponentName />}></Route>  */}
            {/* <Route path="/" element={<ComponentName />}></Route>  */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
