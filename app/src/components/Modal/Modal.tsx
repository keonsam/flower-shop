import { ReactNode } from "react";
import styles from "./Modal.module.css";
import Header from "../Header/Header";

type Props = {
  children: ReactNode;
  title: string;
  footer: ReactNode;
};

const Modal = ({ children, footer, title }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <Header variant="h2" title={title} />
        <>{children}</>
        <>{footer}</>
      </div>
    </div>
  );
};

export default Modal;
