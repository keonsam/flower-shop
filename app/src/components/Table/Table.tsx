import { ReactNode } from "react";
import styles from "./Table.module.css";

type Props = {
  columns: string[];
  children: ReactNode;
};

// adhoc Table component
export default function Table({ columns, children }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
