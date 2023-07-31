import { ReactNode } from "react";
import styles from "./TableCell.module.css";

type Props = {
  children: ReactNode;
};

export default function TableCell({ children }: Props) {
  return <td className={styles.cell}>{children}</td>;
}
