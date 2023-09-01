import { ReactNode } from "react";
import classes from "./KewordTag.module.css";

type kewordTagProps = {
  text: string;
  children: ReactNode;
};

const KewordTag = ({ text, children }: kewordTagProps) => {
  return (
    <div className={classes.kewordTag}>
      <span>{text}</span>
      {children}
    </div>
  );
};

export default KewordTag;
