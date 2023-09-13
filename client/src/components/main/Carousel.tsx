import { FC, useState, useEffect } from "react";
import classes from "./Carousel.module.css";
import CarouselItem from "./CarouselItem";
import firstCarousel from "../../assets/images/carousel_first.svg";
import secondCarousel from "../../assets/images/carousel_second.svg";
import thirdCarousel from "../../assets/images/carousel_third.svg";

interface CarouselItemProps {
  id: number;
  img: string;
}

const Carousel: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const goToNextSlide = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % carouselImg.length);
  };

  return (
    <div className={classes.field}>
      <div className={classes.inner}>
        {carouselImg.map(item => {
          return <CarouselItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Carousel;
