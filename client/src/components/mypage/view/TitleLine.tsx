import { FC } from "react";
import classes from "./TitleLine.module.css";

interface titleProps {
  title: string;
}

const TitleLine: FC<titleProps> = ({ title }) => {
  return (
    <div className={classes.titleline}>
      <h1 className={classes.title}>{title}</h1>
    </div>
  );
};

export default TitleLine;
