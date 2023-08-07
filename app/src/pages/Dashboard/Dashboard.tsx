import { useMemo } from "react";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import { useCustomers } from "../../hooks/useCustomers";
import { useOrders } from "../../hooks/useOrders";
import styles from "./Dashboard.module.css";
import { Bar, Doughnut } from "react-chartjs-2";
import { useFlowers } from "../../hooks/useFlowers";
import { calcStats } from "../../utils/orderUtils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ArcElement
);

export default function Dashboard() {
  const { customers } = useCustomers({});
  const { orders } = useOrders({});
  const { flowers } = useFlowers();

  //
  const stats = useMemo(
    () => calcStats(orders?.items, flowers),
    [orders, flowers]
  );

  return (
    <Layout>
      <div className={styles.container}>
        {/* TODO: Make component */}
        {/* TODO: Num of Customers */}
        <div className={styles.stats}>
          <div className={styles.item}>
            <div>
              <Header variant="h5" title="Number of Customers" />
            </div>
            <p className={styles.numOfData}>{customers?.total || 0}</p>
          </div>

          {/* TODO: Num of Orders */}

          <div className={styles.item}>
            <div>
              <Header variant="h5" title="Number of Orders" />
            </div>
            <p className={styles.numOfData}>{orders?.total || 0}</p>
          </div>
        </div>

        {/* TODO: Number of orders by days of the week */}

        <div className={styles.statsRight}>
          <div className={styles.item}>
            <div>
              <Header variant="h5" title="Orders by days of the week" />
              {stats.orderByDaysOfWeek && (
                <Bar
                  data={{
                    labels: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    datasets: [
                      {
                        label: "# of Orders",
                        data: stats.orderByDaysOfWeek,
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>

          <div className={styles.item}>
            <div>
              <Header variant="h5" title="Flowers sales distribution" />
              {stats.ordersByFlowers && (
                <Doughnut
                  data={{
                    labels: ["Rose", "Lily", "Tulip", "Orchid", "Carnation"],
                    datasets: [
                      {
                        data: stats.ordersByFlowers,
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
