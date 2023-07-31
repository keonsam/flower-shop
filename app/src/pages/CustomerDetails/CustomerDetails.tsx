import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import OrderList from "../../components/OrderList/OrderList";
import { useCustomer } from "../../hooks/useCustomer";
import styles from "./CustomerDetails.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

export default function CustomerDetails() {
    const { id } = useParams();
    const { customer } = useCustomer(id);

  if (!customer || !id) {
    return;
  }

  return (<Layout>
    <div className={styles.details}>
            <div className={styles.tableHead}>
        <Header variant="h2" title="Customer"/>
              <Button
        label="Download PDF"
        size="medium"
        // onClick={() =>
        //   setCustomerModal({
        //     id: "",
        //     mode: "create",
        //     show: true,
        //   })
        // }
      />
      </div>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone Number: {customer.phoneNumber}</p>
      <p>Delivery Address: {customer.location}</p>
    </div>
    <OrderList customerId={id}></OrderList>
    </Layout>);
}
