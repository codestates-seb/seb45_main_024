import { ReactNode } from "react";
import classes from "./SearchInput.module.css";

type Props = {
  placeholder: string;
  children: ReactNode;
};

const SearchInput = ({ placeholder, children }: Props) => {
  return (
    <div className={classes.searchBar}>
      {children}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default SearchInput;
