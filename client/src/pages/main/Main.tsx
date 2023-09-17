import { FC, useState } from "react";
import classes from "./Main.module.css";
import S from "../../assets/main/S.svg";
import M from "../../assets/main/M.svg";
import Face from "../../assets/main/Face.svg";
import T from "../../assets/main/T.svg";
import H from "../../assets/main/H.svg";
import I from "../../assets/main/I.svg";
import E from "../../assets/main/E.svg";
import smo from "../../assets/main/smo.svg";
import oth from "../../assets/main/oth.svg";
import ie from "../../assets/main/ie.svg";

const Main: FC = () => {
  const [clickFirst, setClickFirst] = useState(false);
  const [clickSecond, setClickSecond] = useState(false);
  const [clickThird, setClickThird] = useState(false);
  const [clickForth, setClickForth] = useState(false);

  const handleFadeIn = () => {
    setClickFirst(!clickFirst);
    setTimeout(() => {
      setClickSecond(!clickSecond);
    }, 3000);
    setTimeout(() => {
      setClickThird(!clickThird);
    }, 6000);
    setTimeout(() => {
      setClickForth(!clickForth);
    });
  };

  // useEffect(() => {
  //   if (click) {
  //     // 클릭 시 setTimeout을 사용하여 1초 후에 클래스를 토글합니다.
  //     const timeout = setTimeout(() => {
  //       setClick(false);
  //     }, 4000); // 1000ms(1초) 지연

  //     // 컴포넌트 언마운트 시 clearTimeout을 호출하여 메모리 누수를 방지합니다.
  //     return () => clearTimeout(timeout);
  //   }
  // }, [click]);

  return (
    <div className={classes.field}>
      <img
        className={`${classes.smo} ${
          clickFirst
            ? classes.dropdownMenu_active
            : classes.dropdownMenu_inactive
        }`}
        alt="smo"
        src={smo}
      />
      <img
        className={`${classes.oth} ${
          clickSecond
            ? classes.dropdownMenu_active
            : classes.dropdownMenu_inactive
        }`}
        alt="oth"
        src={oth}
      />
      <div className={classes.logoText}>
        <p>Welcome To The</p>
        <div className={classes.textBox}>
          <img className={classes.textS} alt="S" src={S} />
          <img className={classes.textM} alt="M" src={M} />
          <img
            className={classes.face}
            alt="Face"
            src={Face}
            onClick={handleFadeIn}
          />
          <img className={classes.textT} alt="T" src={T} />
          <img className={classes.textH} alt="H" src={H} />
          <img className={classes.textI} alt="I" src={I} />
          <img className={classes.textE} alt="E" src={E} />
        </div>
        <span>스무디의 얼굴을 클릭해보세요!</span>
      </div>
      <img
        className={`${classes.ie} ${
          clickThird
            ? classes.dropdownMenu_active
            : classes.dropdownMenu_inactive
        }`}
        alt="ie"
        src={ie}
      />
    </div>
  );
};

export default Main;

// import { FC } from "react";
// import classes from "./Main.module.css";
// import Carousel from "../../components/main/Carousel";

// const Main: FC = () => {
//   // 오... 컴포넌트를 배열에 담는 게 가능하네..?

//   return (
//     <div className={classes.field}>
//       <div className={classes.carousel}>
//         <Carousel />
//       </div>
//     </div>
//   );
// };

// export default Main;
