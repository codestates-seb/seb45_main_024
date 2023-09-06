import { FC, useState } from "react";
import classes from "./SoftInput.module.css";

const SoftInput: FC = () => {
  const [input, setInput] = useState("");
  return (
    <div className={classes.softInputContainer}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className={classes.softInput}
        placeholder="추가하고 싶은 항목을 입력하세요"
      />
    </div>
  );
};

export default SoftInput;
