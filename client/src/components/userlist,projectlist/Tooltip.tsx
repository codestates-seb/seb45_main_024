import { ReactNode } from "react";
import { ReactComponent as ApprovedSvg } from "../../assets/icons/approved.svg";
import { ReactComponent as RejectedSvg } from "../../assets/icons/error.svg";
import classes from "./Tooltip.module.css";

type Props = {
  type: "APPROVE" | "REJECT";
  children: ReactNode;
};

const Tooltip = ({ type, children }: Props) => {
  return (
    <div className={classes.tooltip}>
      {type === "APPROVE" ? <ApprovedSvg /> : <RejectedSvg />}
      {children}
    </div>
  );
};

export default Tooltip;
