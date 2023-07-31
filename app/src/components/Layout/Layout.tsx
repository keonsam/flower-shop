import { ReactNode } from "react";
import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
