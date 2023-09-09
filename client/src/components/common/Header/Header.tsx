import { FC } from "react";
import classes from "./Header.module.css";
import HeaderLeftMenu from "./HeaderLeftMenu";
import HeaderRightMenu from "./HeaderRightMenu";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.inHeader}>
        <div className={classes.container}>
          <HeaderLeftMenu />
          <HeaderRightMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
