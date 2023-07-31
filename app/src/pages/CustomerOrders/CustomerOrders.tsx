import { useState } from "react";
import CustomerList from "../../components/CustomerList/CustomerList";
import Layout from "../../components/Layout/Layout";
export default function CustomerOrders() {
  return (
    <Layout>
      {/* <nav>
        <button onClick={() => setTab(0)}>Orders</button>
        <button onClick={() => setTab(1)}>Customers</button>
      </nav> */}

      {/* {tab === 0 && <OrderList />} */}
      {<CustomerList />}
    </Layout>
  );
}
