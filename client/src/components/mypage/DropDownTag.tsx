import { FC, useState } from "react";
import classes from "./DropDownTag.module.css";

interface DropDownTagProps {
  techName: string;
  id: number;
  onDelete: (id: number) => void;
}

const DropDownTag: FC<DropDownTagProps> = ({ techName, id, onDelete }) => {
  const [selectedLevel, setSelectedLevel] = useState("A");

  return (
    <div className={classes.dropDowntagContainer}>
      <span className={classes.tagName} onClick={() => onDelete(id)}>
        {techName}
      </span>
      <select
        className={classes.levelDropdown}
        value={selectedLevel}
        onChange={e => setSelectedLevel(e.target.value)}
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
      </select>
    </div>
  );
};

export default DropDownTag;
