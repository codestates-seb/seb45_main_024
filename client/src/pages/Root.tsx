import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
