import { FC } from "react";
import classes from "./HeaderLeft.module.css";
import smoothie from "../../../assets/images/logo-circle.svg";

const HeaderLeft: FC = () => {
  return (
    <div className={classes.left}>
      <img alt="logo" src={smoothie} />
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
