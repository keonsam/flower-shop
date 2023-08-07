import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import OrderList, { OrderModal } from "../../components/OrderList/OrderList";
import { useCustomer } from "../../hooks/useCustomer";
import styles from "./CustomerDetails.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomerDetails() {
  const { id } = useParams();
  const { customer } = useCustomer(id);
  const [orderModal, setOrderModal] = useState<OrderModal>({
    id: "",
    mode: "create",
    show: false,
  });

  if (!customer || !id) {
    return;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.tableHead}>
          <Header variant="h2" title="Customer" />

          <div className={styles.headerIcons}>
          <Button
            label="Create Order"
            size="medium"
            onClick={() =>
              setOrderModal({
                id: "",
                mode: "create",
                show: true,
              })
            }
          />

          <FontAwesomeIcon
            icon={faDownload}
            className={styles.download}
            // onClick={() =>
            //   setDeleteModal({
            //     id,
            //     show: true,
            //   })
            // }
          />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detailsSection}>
            <p className={styles.detailsPoints}>Name: {customer.name}</p>
            <p className={styles.detailsPoints}>Email: {customer.email}</p>
          </div>
          <div className={styles.detailsSection}>
            <p className={styles.detailsPoints}>
              Phone Number: {customer.phoneNumber}
            </p>
            <p className={styles.detailsPoints}>
              Delivery Address: {customer.location}
            </p>
          </div>
        </div>
        <OrderList
          customerId={id}
          orderModal={orderModal}
          setOrderModal={setOrderModal}
        ></OrderList>
      </div>
    </Layout>
  );
}
