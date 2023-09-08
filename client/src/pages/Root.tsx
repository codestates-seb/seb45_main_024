import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
