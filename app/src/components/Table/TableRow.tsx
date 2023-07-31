import { ReactNode } from "react";
import styles from "./TableRow.module.css";

type Props = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
};

export default function TableRow({ children, onClick }: Props) {
  return <tr className={styles.row} onClick={onClick}>{children}</tr>;
}
