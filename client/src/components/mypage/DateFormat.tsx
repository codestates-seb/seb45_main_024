import { FC } from "react";

interface DateProps {
  date: string;
}

const DateFormat: FC<DateProps> = ({ date }) => {
  const parsedDate = new Date(date);
  const formattedDate = `${parsedDate.getFullYear()}.${String(
    parsedDate.getMonth() + 1,
  ).padStart(2, "0")}.${String(parsedDate.getDate()).padStart(2, "0")}`;
  return <span>{formattedDate}</span>;
};

export default DateFormat;
