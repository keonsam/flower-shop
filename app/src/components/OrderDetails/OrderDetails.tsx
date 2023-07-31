import { useFieldArray, useForm } from "react-hook-form";
import { ModalMode } from "../../types/Modal";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import { Order, OrderData, OrderStatus } from "../../types/order";
import Select from "../Select/Select";
import { useFlowers } from "../../hooks/useFlowers";
import { useEffect, useState } from "react";
import TextField from "../TextField/TextField";
import styles from "./OrderDetails.module.css";
// import { calculateOrderCost } from "../../utils/orderUtils";
import { useOrder } from "../../hooks/useOrder";
import axiosClient from "../../config/axiosClient";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

type Props = {
  customerId: string
  mode: ModalMode;
  id: string;
  onClose: (update?: boolean) => void;
};

export default function OrderDetails({ customerId, id, mode, onClose }: Props) {
  const { order } = useOrder(id);
  const [formError, setFormError] = useState("");

  const { flowers } = useFlowers();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<OrderData>({
    mode: "onBlur",
    defaultValues: {
      customerId,
      status: OrderStatus.PENDING,
      items: [],
    },
  });

  const { fields, append } = useFieldArray<OrderData>({
    control,
    name: "items",
  });

  // save customer
  const { isLoading: isSaving, mutate } = useMutation(
    (orderData: OrderData) => {
      if (id) {
        return axiosClient.put<Order>(`/orders/${id}`, orderData);
      }
      return axiosClient.post<Order>("/orders", orderData);
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          setFormError(err.response?.data.message);
        } else if (err instanceof Error) {
          setFormError(err.message);
        }
      },
      onSuccess: () => {
        onClose(true);
      },
    }
  );

  const onSubmit = (data: OrderData) => {
    const orderData: OrderData = {
      ...data,
      deliveryTime: new Date(data.deliveryTime).toISOString(),
      items: data.items
        .filter(({ quantity }) => quantity > 0)
        .map(({ flowerId, quantity }) => ({ flowerId, quantity })),
    };
    mutate(orderData);
  };

  useEffect(() => {
    if (flowers?.length && !getValues("items").length) {
      console.log("flowers rerender");
      append(
        flowers.map(({ id, name, price }) => ({
          flowerId: id,
          name,
          price,
          quantity: 0,
        }))
      );
    }
  }, [flowers, append, getValues]);

  useEffect(() => {
    if (order?.id) {
      console.log("Order Details rerender");
      setValue("customerId", order.customerId);
      setValue("deliveryTime", order.deliveryTime);
      setValue("status", order.status);
      order.items?.forEach((item) => {
        const index = fields.findIndex(
          ({ flowerId }) => flowerId === item.flowerId
        );
        setValue(`items.${index}.quantity`, item.quantity);
      });
    }
  }, [order, setValue, fields]);

  // const total = calculateOrderCost(watch("items"));

  return (
    <Modal
      title={mode === "edit" ? "Edit Customer Form" : "Create Customer"}
      footer={
        <Footer
          disabled={isSaving || !isValid}
          onClose={onClose}
          submitLabel={mode === "edit" ? "Save" : "Submit"}
          onSubmit={handleSubmit(onSubmit)}
          closeLabel="Cancel"
        />
      }
    >
      <form>
        <TextField<OrderData>
          id="delivery-time"
          label="Delivery Time"
          error={errors.deliveryTime}
          name="deliveryTime"
          register={register}
          required
          options={{
            required: "Delivery Time is required",
          }}
          type="datetime-local"
        />

        <Select<OrderData>
          id="status"
          label="Order Status"
          name="status"
          placeholder="Select Order Status"
          register={register}
          required
          options={{
            required: "Order Status is required",
          }}
          selectOption={[
            { label: "Pending", value: OrderStatus.PENDING },
            { label: "Shipped", value: OrderStatus.SHIPPED },
            { label: "Delivered", value: OrderStatus.DELIVERED },
            { label: "Canceled", value: OrderStatus.CANCELED },
          ]}
        />

        {fields?.length && (
          <ul className={styles.orderList}>
            {fields.map(({ flowerId, name, price }, index) => (
              <li className={styles.orderItems} key={flowerId}>
                <div className={styles.orderName}>{name}</div>
                <div className={styles.orderPrice}>{`$${price}`}</div>
                <div className={styles.orderQuantity}>
                  <TextField
                    id={`item.${index}`}
                    type="number"
                    register={register}
                    name={`items.${index}.quantity` as const}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.total}>
          <h4 className={styles.totalText}>Total:</h4> <span>${0}</span>
        </div>
      </form>

      <p className={styles.formError}>{formError && formError}</p>
    </Modal>
  );
}
