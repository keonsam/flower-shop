import Layout from "../../components/Layout/Layout";
import { useCustomers } from "../../hooks/useCustomers";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { customers } = useCustomers({});

  return (
  <Layout>
    <div className={styles.container}>
      <div className={styles.item}>
        <h6 className={styles.title}>Number of customer</h6>
        <p className={styles.total}>{customers?.total}</p>
      </div>
    </div>
  </Layout>);
}
