import { FC } from "react";
import classes from "./SoftInput.module.css";

interface SoftInputProps {
  input: string;
  setInput: (value: string) => void;
}

const SoftInput: FC<SoftInputProps> = ({ input, setInput }) => {
  return (
    <div className={classes.softInputContainer}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className={classes.softInput}
        placeholder="내용을 추가해보세요."
      />
    </div>
  );
};

export default SoftInput;
