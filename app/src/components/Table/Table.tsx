import { ReactNode } from "react";
import styles from "./Table.module.css";
import TableRow from "./TableRow";

type Props = {
  columns: string[];
  children: ReactNode;
};

// adhoc Table component
export default function Table({ columns, children }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table} cellSpacing="0">
        <thead>
          <TableRow>
            {columns.map((column) => (
              <th className={styles.tableHeader} key={column}>
                {column}
              </th>
            ))}
          </TableRow>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
