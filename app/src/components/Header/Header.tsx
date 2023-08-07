import styles from "./Header.module.css";

type Props = {
  title: string;
  variant: "h1" | "h2" | "h3" | "h4" | "h5";
};
export default function Header({ title, variant = "h1" }: Props) {
  switch (variant) {
    case "h1":
      return <h1 className={styles.headline1}>{title}</h1>;
    case "h2":
      return <h2 className={styles.headline2}>{title}</h2>;
    case "h3":
      return <h3 className={styles.headline3}>{title}</h3>;
    case "h4":
      return <h4 className={styles.headline4}>{title}</h4>;
    case "h5":
      return <h5 className={styles.headline5}>{title}</h5>;
  }
}
