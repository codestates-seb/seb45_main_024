import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Text_S } from "../../assets/main/S.svg";
import { ReactComponent as Text_M } from "../../assets/main/M.svg";
import { ReactComponent as Text_Face } from "../../assets/main/Face.svg";
import { ReactComponent as Text_T } from "../../assets/main/T.svg";
import { ReactComponent as Text_H } from "../../assets/main/H.svg";
import { ReactComponent as Text_I } from "../../assets/main/I.svg";
import { ReactComponent as Text_E } from "../../assets/main/E.svg";

import classes from "./Main.module.css";

const Main: FC = () => {
  const navigate = useNavigate();
  const svgSize = 100;

  return (
    <div className={classes.container}>
      <div className={classes.contents}>
        <p className={classes.welcomeText}>Welcome To</p>
        <div className={classes.logoText}>
          <div className={classes.textBox}>
            <Text_S
              className={classes.textS}
              width={svgSize}
              height={svgSize}
            />
            <Text_M
              className={classes.textM}
              width={svgSize}
              height={svgSize}
            />
            <Text_Face
              className={classes.textOO}
              width={svgSize + 50}
              height={svgSize + 40}
            />
            <Text_T
              className={classes.textT}
              width={svgSize}
              height={svgSize}
            />
            <Text_H
              className={classes.textH}
              width={svgSize}
              height={svgSize}
            />
            <Text_I
              className={classes.textI}
              width={svgSize - 30}
              height={svgSize}
            />
            <Text_E
              className={classes.textE}
              width={svgSize}
              height={svgSize}
            />
          </div>
        </div>
        <div className={classes.subText}>
          <p className={classes.subTextTitle}>
            나와 잘 맞는 팀원과 함께하는 사이드 프로젝트, 스무디
          </p>
          <div className={classes.subTextDesc}>
            <p>여러분의 시작으로 이끌어낸 결과를 통해 서로를 평가해 보세요.</p>
            <p>스무디는 여러분의 발걸음에 힘을 보태면서 응원하고 있습니다.</p>
          </div>
        </div>
        <div className={classes.buttonArea}>
          <button onClick={() => navigate("/login")}>
            스무디와 함께하기 &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
