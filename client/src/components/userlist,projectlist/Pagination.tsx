import classes from "./Pagination.module.css";
import { ArrowLeftSvg } from "../../assets/icons/arrowsSvg";
import { ArrowRightSvg } from "../../assets/icons/arrowsSvg";

type Props = {
  totalCards: number;
  currentPage: number;
};

const Pagination = ({ totalCards, currentPage }: Props) => {
  const cardPerPage = 8; // 한 페이지 당 노출할 카드 갯수
  const totalPage = Math.ceil(totalCards / cardPerPage);

  currentPage = +currentPage; // currentPage를 숫자로 타입 변환

  // const handlePageChange = page => {
  //   console.log("handlePageChange");
  //   // onChangePage(page);
  // };

  return (
    <div>
      <button
        disabled={currentPage === 1}
        // onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeftSvg stroke="var(--color-black-1)" />
      </button>
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index}
          // $active={index + 1 === currentPage}
          // onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPage}
        // onClick={() => handlePageChange(currentPage + 1)}
      >
        <ArrowRightSvg stroke="var(--color-black-1)" />
      </button>
    </div>
  );
};

export default Pagination;
