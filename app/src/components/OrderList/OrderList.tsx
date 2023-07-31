import { useState } from "react";
import Button from "../Button/Button";
import { ModalMode } from "../../types/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useOrders } from "../../hooks/useOrders";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow";
import TableCell from "../Table/TableCell";
import styles from "./OrderList.module.css";
// import DeleteModal from "../DeleteModal/DeleteModal";
// import { useMutation } from "react-query";
// import axiosClient from "../../config/axiosClient";
import { format } from "date-fns";
import Header from "../Header/Header";

type OrderModal = {
  id: string;
  mode: ModalMode;
  show: boolean;
};

// type DeleteModal = {
//   id: string;
//   show: boolean;
// };

type Props = {
  customerId: string;
}

export default function OrderList({ customerId } : Props) {
  const { orders, refetch } = useOrders({}, customerId);
  const [orderModal, setOrderModal] = useState<OrderModal>({
    id: "",
    mode: "create",
    show: false,
  });

  // const [deleteModal, setDeleteModal] = useState<DeleteModal>({
  //   id: "",
  //   show: false,
  // });

  // const { isLoading: isDeleting, mutate } = useMutation(
  //   (id: string) => {
  //     return axiosClient.delete<number>(`/customers/${id}`);
  //   },
  //   {
  //     // TODO: error handling
  //     // onError: (err) => {
  //     //   if (err instanceof AxiosError) {
  //     //     setFormError(err.response?.data.message);
  //     //   } else if (err instanceof Error) {
  //     //     setFormError(err.message);
  //     //   }
  //     // },
  //     onSuccess: () => {
  //       setDeleteModal({
  //         id: "",
  //         show: false,
  //       });
  //       refetch();
  //     },
  //   }
  // );

  const handleCancel = () => {

  }

  return (
    <div>
      <div className={styles.tableHead}>
      <Header variant="h4" title="Orders"/>
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
      </div>

      {orders?.items && (
        <Table columns={["Delivery Time", "Status", "Total"]}>
          {orders.items.map(
            ({ id, deliveryTime, status, total }) => (
              <TableRow key={id}>
                <TableCell>{`${format(
                  new Date(deliveryTime),
                  "E d MMM h:mm a"
                )}`}</TableCell>
                <TableCell>{status.toUpperCase()}</TableCell>
                <TableCell>{`$${total}`}</TableCell>
                <TableCell>
                  <Button  onClick={handleCancel} label="Cancel" size="small"/>
                </TableCell>
              </TableRow>
            )
          )}
        </Table>
      )}

      {orderModal.show && (
        <OrderDetails
          id={orderModal.id}
          customerId={customerId}
          mode={orderModal.mode}
          onClose={(update?: boolean) => {
            if (update) {
              refetch();
            }
            setOrderModal({
              id: "",
              mode: "create",
              show: false,
            });
          }}
        />
      )}

      {/* {deleteModal.show && (
        <DeleteModal
          disabled={isDeleting}
          onClose={() =>
            setDeleteModal({
              id: "",
              show: false,
            })
          }
          onDelete={() => mutate(deleteModal.id)}
        />
      )} */}
    </div>
  );
}
