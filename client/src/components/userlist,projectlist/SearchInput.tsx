import React, { ReactNode, useState } from "react";
import classes from "./SearchInput.module.css";

type Props = {
  placeholder: string;
  onSubmit: (keyword: string) => void;
  children: ReactNode;
};

const SearchInput = ({ placeholder, onSubmit, children }: Props) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(keyword);
    setKeyword("");
  };

  return (
    <form className={classes.searchBar} onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchInput;
