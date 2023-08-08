import { useState } from "react";
import { ModalMode } from "../../types/Modal";
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
import Pagination from "../Pagination/Pagination";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "../DeleteModal/DeleteModal";
import axiosClient from "../../config/axiosClient";
import { useMutation } from "react-query";
import OrderForm from "../OrderForm/OrderForm";
import { useAuth } from "../../context/AuthContext";

type DeleteModal = {
  id: string;
  show: boolean;
};

export type OrderModal = {
  id: string;
  mode: ModalMode;
  show: boolean;
};

type Props = {
  customerId: string;
  orderModal: OrderModal;
  setOrderModal: (status: OrderModal) => void;
};

export default function OrderList({
  customerId,
  orderModal,
  setOrderModal,
}: Props) {
  const { token } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const { orders, refetch } = useOrders(
    { pageNumber, pageSize: 5 },
    customerId
  );

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    id: "",
    show: false,
  });

  const { isLoading: isDeleting, mutate } = useMutation(
    (id: string) => {
      return axiosClient.delete<number>(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      // TODO: error handling
      // onError: (err) => {
      //   if (err instanceof AxiosError) {
      //     setFormError(err.response?.data.message);
      //   } else if (err instanceof Error) {
      //     setFormError(err.message);
      //   }
      // },
      onSuccess: () => {
        setDeleteModal({
          id: "",
          show: false,
        });
        refetch();
      },
    }
  );

  return (
    <div className={styles.container}>
      <Header variant="h4" title="Orders:" />

      {orders?.items && (
        <Table columns={["Delivery Time", "Status", "Total", "Action"]}>
          {orders.items.map(({ id, deliveryTime, status, total }) => (
            <TableRow key={id}>
              <TableCell>{`${format(
                new Date(deliveryTime),
                "dd/M/y @ h:mma"
              )}`}</TableCell>
              <TableCell>{status.toUpperCase()}</TableCell>
              <TableCell>{`$${total}`}</TableCell>
              <TableCell>
                <FontAwesomeIcon
                  icon={faPencil}
                  className={styles.edit}
                  onClick={() =>
                    setOrderModal({
                      id,
                      mode: "edit",
                      show: true,
                    })
                  }
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.delete}
                  onClick={() =>
                    setDeleteModal({
                      id,
                      show: true,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      <Pagination
        total={orders?.total || 0}
        pageNumber={pageNumber}
        prev={() => setPageNumber(pageNumber - 1)}
        next={() => setPageNumber(pageNumber + 1)}
        setPage={(page) => setPageNumber(page)}
      />

      {orderModal.show && (
        <OrderForm
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

      {deleteModal.show && (
        <DeleteModal
          description="Are you sure you want to delete this order? This action cannot be undone."
          disabled={isDeleting}
          onClose={() =>
            setDeleteModal({
              id: "",
              show: false,
            })
          }
          onDelete={() => mutate(deleteModal.id)}
          title="Delete Order"
        />
      )}
    </div>
  );
}
