import { FC, useState, useEffect, useRef } from "react";
import classes from "./Carousel.module.css";
import CarouselItem from "./CarouselItem";
import firstCarousel from "../../assets/images/carouselFirst.svg";
import secondCarousel from "../../assets/images/carouselSecond.svg";
import thirdCarousel from "../../assets/images/carouselThird.svg";

interface CarouselItemProps {
  id: number;
  img: string;
}

const Carousel: FC = () => {
  const carouselImg: CarouselItemProps[] = [
    {
      id: 1,
      img: firstCarousel,
    },
    {
      id: 2,
      img: secondCarousel,
    },
    {
      id: 3,
      img: thirdCarousel,
    },
  ];

  const [slideIdx, setSlideIdx] = useState(0);
  let prevIdx: number; // 이전 슬라이드 상태를 저장하는 변수
  const slideRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setSlideIdx((idx: number) => {
          if (idx === 0) {
            prevIdx = 0;
            return idx + 1;
          } else if (idx === 1) {
            if (prevIdx === 0) {
              return idx + 1;
            } else if (prevIdx === 2) {
              return idx - 1;
            }
          } else if (idx === 2) {
            prevIdx = 2;
            return idx - 1;
          }
        }),
      7500,
    );
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    slideRef.current.style.transition = "all 1.6s ease-in-out";
    slideRef.current.style.transform = `translateX(-${(slideIdx * 100) / 3}%)`;
  }, [slideIdx]);

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.carouselInner} ref={slideRef}>
        {carouselImg.map(item => {
          return <CarouselItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Carousel;
