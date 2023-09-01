import { ReactNode } from "react";
import classes from "./SearchInput.module.css";

type SearchInputProps = {
  placeholder: string;
  children: ReactNode;
};

const SearchInput = ({ placeholder, children }: SearchInputProps) => {
  return (
    <div className={classes.searchBar}>
      {children}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default SearchInput;
