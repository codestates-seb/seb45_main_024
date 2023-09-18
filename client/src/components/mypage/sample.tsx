import { FC, useState, useRef, useEffect } from "react";
import classes from "./sample.module.css";
import logoCircle from "../../assets/images/logo-circle.svg";

type Logo = {
  id: number;
  name: string;
  image: string;
};

const findTeamContent =
  "사용할 수 있는 기술역량을 등록하고, 원하는 프로젝트를 어필해보세요! 더 꾸며야 겠죠 아마 이 정도는 너무 허접한데 그냥 드래그 드롭 연습한걸로 만족";
const findMateContent =
  "프로젝트를 기획하고, 원하는 팀원을 모집해보세요. 더 꾸며야 겠죠 아마 이 정도는 너무 허접한데 그냥 드래그 드롭 연습한걸로 만족";

const Sample: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalContent, setModalContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [originPos, setOriginPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
    const rectTeam = document
      .querySelector(`.${classes.findTeam}`)
      ?.getBoundingClientRect();
    const rectMate = document
      .querySelector(`.${classes.findMate}`)
      ?.getBoundingClientRect();

    if (
      rectTeam &&
      e.clientX > rectTeam.left &&
      e.clientX < rectTeam.right &&
      e.clientY > rectTeam.top &&
      e.clientY < rectTeam.bottom
    ) {
      setModalTitle("저는 이런 팀을 찾아요");
      setModalContent(findTeamContent);
      toggleModal();
    } else if (
      rectMate &&
      e.clientX > rectMate.left &&
      e.clientX < rectMate.right &&
      e.clientY > rectMate.top &&
      e.clientY < rectMate.bottom
    ) {
      setModalTitle("저는 이런 팀원을 찾아요");
      setModalContent(findMateContent);
      toggleModal();
    }
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
          onDragEnd={handleDragEnd}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            position: "absolute",
          }}
        />
        <div
          className={`${classes.background} ${classes.modalGround}`}
          ref={containerRef}
        >
          {isModalOpen && (
            <div className={classes.modal}>
              <h1>{modalTitle}</h1>
              <p>{modalContent}</p>
              <div className={classes.actions}>
                <button onClick={toggleModal}>자세히 알아보기</button>
                <button onClick={toggleModal}>닫기</button>
              </div>
            </div>
          )}
        </div>
        <div className={`${classes.background}`} ref={containerRef}>
          <section className={`${classes.box} ${classes.findTeam}`}>
            <h1>Find your team!</h1>
            <p>로고를 가져와 보세요!</p>
          </section>
          <section className={`${classes.box} ${classes.findMate}`}>
            <h1>Find your mate!</h1>
            <p>로고를 가져와 보세요!</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Sample;
