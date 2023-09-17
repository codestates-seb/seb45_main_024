import { FC, useState } from "react";
import classes from "./sample.module.css";
import default_profile from "../../assets/images/default_profile.svg";

type Logo = {
  id: number;
  name: string;
  image: string;
};

const Sample: FC = () => {
  //   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dragged, setDragged] = useState<Logo | null>(null);
  const [dropped, setDropped] = useState<{
    logo: Logo;
    x: number;
    y: number;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>, item: any) => {
    setDragged(item);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragged) {
      setDropped({ logo: dragged, x: e.clientX, y: e.clientY });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const logo = { id: 1, name: "logo1", image: default_profile };

  return (
    <div className={classes.containerBox}>
      <div
        className={`${classes.container} ${classes.first}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {dropped === null && (
          <img
            key={logo.id}
            src={logo.image}
            alt={logo.name}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, logo)}
            className={classes.logo}
          />
        )}
      </div>
      <div
        className={`${classes.container} ${classes.second}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {dropped && (
          <img
            key={logo.id}
            src={logo.image}
            alt={logo.name}
            draggable="true"
            style={{
              top: `${dropped.y}px` + 200,
              left: `${dropped.x}px` + 200,
            }}
            onDragStart={(e) => handleDragStart(e, logo)}
            className={classes.logo}
          />
        )}
      </div>
    </div>
  );
};

export default Sample;
