import { useState } from "react";
import { ArrowDownSvg } from "../../assets/icons/arrowsSvg";
import classes from "./Selectbox.module.css";

// interface techTagList {
//   id: number;
//   name: string;
//   tagType: string;
// }

type Props = {
  title: string;
  borderRadius?: number;
  width?: number;
  options: string[];
  selectedOption: string;
  onSelect: (selected: string) => void;
  techTags?: boolean;
};

const Select = ({
  title,
  borderRadius = 20,
  width = 120,
  options,
  selectedOption,
  onSelect,
  techTags,
}: Props) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    handleToggle();
  };

  return (
    <div className={`${classes.selectbox} ${techTags ? classes.techTags : ""}`}>
      <div
        className={classes.seletTitle}
        onClick={handleToggle}
        style={{
          borderRadius: borderRadius,
          width: width,
        }}
      >
        <span>{title}</span>
        <ArrowDownSvg />
      </div>
      <ul
        className={`${classes.selectList} ${toggle ? classes.open : ""}`}
        style={{
          borderRadius: borderRadius,
          width: width,
        }}
      >
        {options.map(option => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`${selectedOption === option ? classes.selected : ""}`}
          >
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
