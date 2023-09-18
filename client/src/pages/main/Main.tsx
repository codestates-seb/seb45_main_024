import { FC } from "react";
import classes from "./Main.module.css";
import S from "../../assets/main/S.svg";
import M from "../../assets/main/M.svg";
import Face from "../../assets/main/Face.svg";
import T from "../../assets/main/T.svg";
import H from "../../assets/main/H.svg";
import I from "../../assets/main/I.svg";
import E from "../../assets/main/E.svg";
import first from "../../assets/mainImage/first.svg";
import second from "../../assets/mainImage/second.svg";
import third from "../../assets/mainImage/third.svg";

const Main: FC = () => {
  const scrollDownFirst = () => {
    const screenHeight = window.innerHeight;
    const scrollDistance = screenHeight * 0.89; // 89vh에 해당하는 스크롤 거리 계산

    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth", // 스무스 스크롤 효과
    });
  };

  const scrollDownSecond = () => {
    const screenHeight = window.innerHeight;
    const scrollDistance = screenHeight * 0.89 * 2; // 89vh에 해당하는 스크롤 거리 계산

    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth", // 스무스 스크롤 효과
    });
  };

  const scrollDownThird = () => {
    const screenHeight = window.innerHeight;
    const scrollDistance = screenHeight * 0.89 * 3; // 89vh에 해당하는 스크롤 거리 계산

    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth", // 스무스 스크롤 효과
    });
  };

  const scrollBack = () => {
    const screenHeight = window.innerHeight;
    const scrollDistance = -screenHeight; // 89vh에 해당하는 스크롤 거리 계산

    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth", // 스무스 스크롤 효과
    });
  };

  return (
    <div className={classes.field}>
      <div className={classes.first}>
        <div className={classes.logoText}>
          <p>Welcome To The</p>
          <div className={classes.textBox}>
            <img className={classes.textS} alt="S" src={S} />
            <img className={classes.textM} alt="M" src={M} />
            <img
              className={classes.face}
              alt="Face"
              src={Face}
              onClick={scrollDownFirst}
            />
            <img className={classes.textT} alt="T" src={T} />
            <img className={classes.textH} alt="H" src={H} />
            <img className={classes.textI} alt="I" src={I} />
            <img className={classes.textE} alt="E" src={E} />
          </div>
          <span>스무디의 얼굴을 클릭해보세요!</span>
        </div>
      </div>
      <div className={classes.second}>
        <img alt="first" src={first} className={classes.secondImg} />
        <div className={classes.secondFace}>
          <img
            className={classes.face}
            alt="Face"
            src={Face}
            onClick={scrollDownSecond}
          />
          <span>스무디의 얼굴을 클릭해보세요!</span>
        </div>
      </div>
      <div className={classes.third}>
        <img alt="second" src={second} className={classes.thirdImg} />
        <div className={classes.thirdFace}>
          <img
            className={classes.face}
            alt="Face"
            src={Face}
            onClick={scrollDownThird}
          />
          <span>스무디의 얼굴을 클릭해보세요!</span>
        </div>
      </div>
      <div className={classes.fourth}>
        <img alt="third" src={third} className={classes.fourthImg} />
        <div className={classes.fourthPage}>
          <div className={classes.fourthFace}>
            <img
              className={classes.face}
              alt="Face"
              src={Face}
              onClick={scrollBack}
            />
            <span>스무디의 얼굴을 클릭해보세요!</span>
          </div>
        </div>
      </div>
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
