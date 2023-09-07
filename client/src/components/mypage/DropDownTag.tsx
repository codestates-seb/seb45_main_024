import { FC, useState, useEffect, useRef } from "react";
import classes from "./DropDownTag.module.css";

export const ArrowDownSvg = () => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="var(--color-gray-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface DropDownTagProps {
  techName: string;
  id: number;
  onDelete: (id: number) => void;
}

const DropDownTag: FC<DropDownTagProps> = ({ techName, id, onDelete }) => {
  const [selectedLevel, setSelectedLevel] = useState("A");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // 드롭다운 외 부분 클릭 시 드롭다운 닫힘
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={classes.dropDownTagContainer} ref={dropdownRef}>
      <span className={classes.tagName} onClick={() => onDelete(id)}>
        {techName}
      </span>
      <div
        className={classes.levelDropdown}
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        <ArrowDownSvg />
        <div
          className={`${classes.optionsContainer} ${
            isDropDownOpen ? "" : classes.hidden
          }`}
        >
          {["A", "B", "C", "D", "E"].map((level, index) => (
            <div
              key={index}
              className={classes.option}
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownTag;
