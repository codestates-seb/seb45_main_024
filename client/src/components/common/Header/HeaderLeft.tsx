import { FC } from "react";
import classes from "./HeaderLeft.module.css";
import Logo from "../Logo";

const HeaderLeft: FC = () => {
  return (
    <div className={classes.left}>
      <Logo />
      <ul>
        <li>
          <p>Ingredient</p>
        </li>
        <li>
          <p>Recipe</p>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLeft;
