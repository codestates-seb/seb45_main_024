import { FC } from "react";
import classes from "./CarouselItem.module.css";

interface CarouselItemProps {
  item: {
    id: number;
    img: string;
  };
}

const CarouselItem: FC<CarouselItemProps> = ({ item }) => {
  return (
    <div className={classes.imgFrame}>
      <img alt="carousel" src={item.img} />
    </div>
  );
};

export default CarouselItem;
