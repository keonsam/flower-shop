import { useMemo } from "react";
import styles from "./Pagination.module.css";

const pageSize = 5;

type Props = {
    total: number;
    pageNumber: number;
    prev: () => void;
    next: () => void;
    setPage: (page: number) => void
}

export default function Pagination({ total, pageNumber, prev, next, setPage }: Props) {
    console.log(total);
    const numberOfPages = Math.ceil(total / pageSize);

    const pages = useMemo(() => {
        const arr = []
        for(let i = 1; i <= numberOfPages; i++) {
            arr.push(i);
        }

        return arr;
    }, [numberOfPages])

    if (total <= pageSize) {
        return;
    }


    return (
    <div className={styles.pagination}>
        <button className={styles.button} onClick={prev} disabled={pageNumber === 0}>{"<"}</button>
        { pages.map((page) => (<button className={styles.button} onClick={() => setPage(page)}>{page}</button>))}
        <button
        className={styles.button}
        onClick={next}
        disabled={pageNumber === (numberOfPages -1)}
        >{">"}</button>
    </div>
    );
}