import { FC, useState, useRef, useEffect } from "react";
import classes from "./sample.module.css";
import logoCircle from "../../assets/images/logo-circle.svg";

type Logo = {
  id: number;
  name: string;
  image: string;
};

const Sample: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [originPos, setOriginPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const imgWidth = 100;
      const imgHeight = 100;
      if (rect) {
        setPos({
          x: (rect.width - imgWidth) / 2,
          y: (rect.height - imgHeight) / 2,
        });
      }
    };

    window.addEventListener("resize", updatePosition);

    updatePosition();

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setOriginPos({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleDrag = (e: React.DragEvent<HTMLImageElement>) => {
    if (e.clientX === 0 && e.clientY === 0) return;
    setPos({ x: e.clientX - originPos.x, y: e.clientY - originPos.y });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const logo: Logo = { id: 1, name: "logo1", image: logoCircle };

  return (
    <>
      <div className={classes.back}>
        <img
          src={logo.image}
          draggable
          alt={logo.name}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragOver={handleDragOver}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            position: "absolute",
          }}
        />
        <div className={`${classes.background}`} ref={containerRef}></div>
        <div className={`${classes.background}`} ref={containerRef}>
          <section className={`${classes.box} ${classes.findTeam}`}>
            <h1>Find your team!</h1>
            <p>중앙의 로고를 움직여 보세요</p>
          </section>
          <section className={`${classes.box} ${classes.findMate}`}>
            <h1>Find your mate!</h1>
            <p>중앙의 로고를 움직여 보세요!</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Sample;
