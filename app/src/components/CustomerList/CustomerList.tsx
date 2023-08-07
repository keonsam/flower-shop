import { useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import Button from "../Button/Button";
import { ModalMode } from "../../types/Modal";
import Table from "../Table/Table";
import TableCell from "../Table/TableCell";
import TableRow from "../Table/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./CustomerList.module.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useMutation } from "react-query";
import axiosClient from "../../config/axiosClient";
import Header from "../Header/Header";
import CustomerForm from "../CustomerForm/CustomerForm";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useAuth } from "../../context/AuthContext";

type CustomerModal = {
  id: string;
  mode: ModalMode;
  show: boolean;
};

type DeleteModal = {
  id: string;
  show: boolean;
};

export default function CustomerList() {
  const { token } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const { customers, refetch } = useCustomers({ pageNumber, pageSize: 5 });
  const navigate = useNavigate();
  const [customerModal, setCustomerModal] = useState<CustomerModal>({
    id: "",
    mode: "create",
    show: false,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModal>({
    id: "",
    show: false,
  });

  const { isLoading: isDeleting, mutate } = useMutation(
    (id: string) => {
      return axiosClient.delete<number>(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
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
    <div className={styles.customerList}>
      <div className={styles.tableHead}>
        <Header variant="h2" title="Customers" />
        <Button
          label="Create Customer"
          size="medium"
          onClick={() =>
            setCustomerModal({
              id: "",
              mode: "create",
              show: true,
            })
          }
        />
      </div>

      {customers?.items.length ? (
        <Table columns={["Name", "Email", "Phone Number", "Address", "Action"]}>
          {customers?.items.map(
            ({ id, name, email, phoneNumber, location }) => (
              <TableRow key={id} onClick={() => navigate(`${id}`)}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phoneNumber}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={styles.edit}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomerModal(() => ({
                        id,
                        mode: "edit",
                        show: true,
                      }));
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.delete}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModal({
                        id,
                        show: true,
                      });
                    }}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </Table>
      ) : (
        <p className={styles.noCustomer}> No Customers</p>
      )}

      <Pagination
        total={customers?.total || 0}
        pageNumber={pageNumber}
        prev={() => setPageNumber(pageNumber - 1)}
        next={() => setPageNumber(pageNumber + 1)}
        setPage={(page) => setPageNumber(page)}
      />

      {customerModal.show && (
        <CustomerForm
          id={customerModal.id}
          mode={customerModal.mode}
          onClose={(update?: boolean) => {
            if (update) {
              refetch();
            }

            setCustomerModal({
              id: "",
              mode: "create",
              show: false,
            });
          }}
        />
      )}

      {deleteModal.show && (
        <DeleteModal
          description="Are you sure you want to delete this customer? This action cannot be undone."
          disabled={isDeleting}
          onClose={() =>
            setDeleteModal({
              id: "",
              show: false,
            })
          }
          onDelete={() => mutate(deleteModal.id)}
          title="Delete Customer"
        />
      )}
    </div>
  );
}
