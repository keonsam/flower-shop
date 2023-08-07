import { useMemo } from "react";
import styles from "./Pagination.module.css";

const pageSize = 5;

type Props = {
  total: number;
  pageNumber?: number;
  prev: () => void;
  next: () => void;
  setPage: (page: number) => void;
};

export default function Pagination({
  total,
  pageNumber = 1,
  prev,
  next,
  setPage,
}: Props) {
  const numberOfPages = Math.ceil(total / pageSize);

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= numberOfPages; i++) {
      arr.push(i);
    }

    return arr;
  }, [numberOfPages]);

  if (numberOfPages <= 1) {
    return;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationControls}
        onClick={prev}
        disabled={pageNumber === 1}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          className={`${styles.paginationNumbers} ${
            pageNumber === page ? styles.active : ""
          }`}
          key={page}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.paginationControls}
        onClick={next}
        disabled={pageNumber === numberOfPages}
      >
        {">"}
      </button>
    </div>
  );
}
