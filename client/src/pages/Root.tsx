import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer";
import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();
  const isMain = location.pathname === "/";

  return (
    <>
      <Header />
      <div className={`container ${isMain ? "full-container" : null}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
