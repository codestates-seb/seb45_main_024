import { FC } from "react";
import classes from "./NoContent.module.css";
import facelogo from "../../assets/images/logo_green_face.png;

const NoContent: FC = () => {
  return (
    <div className={classes.noContentContainer}>
        <img src={facelogo}/>
      <h1>작성하신 프로필이 없습니다</h1>
    </div>
  );
};

export default NoContent;
