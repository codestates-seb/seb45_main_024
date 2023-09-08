import { FC } from "react";
import classes from "./Header.module.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
