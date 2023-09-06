import { useState } from "react";
import classes from "./Selectbox.module.css";
import { ArrowDownSvg } from "../../assets/icons/arrowsSvg";

type Props = {
  title: string;
  borderRadius?: number;
  options: string[];
  selectedOption: string;
  onSelect: (selected: string) => void;
};

const Select = ({
  title,
  borderRadius = 20,
  options,
  selectedOption,
  onSelect,
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
    <div className={classes.selectbox}>
      <div
        className={classes.seletTitle}
        onClick={handleToggle}
        style={{
          borderRadius: borderRadius,
        }}
      >
        <span>{title}</span>
        <ArrowDownSvg />
      </div>
      <ul
        className={`${classes.selectList} ${toggle ? classes.open : ""}`}
        style={{
          borderRadius: borderRadius,
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
