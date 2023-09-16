import { FC } from "react";
import classes from "./HardInput.module.css";

interface HardInputProps {
  input: string;
  setInput: (value: string) => void;
}

const HardInput: FC<HardInputProps> = ({ input, setInput }) => {
  return (
    <div className={classes.hardInputContainer}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className={classes.hardInput}
        placeholder="내용을 추가해보세요."
      />
    </div>
  );
};

export default HardInput;
