import { useForm } from "react-hook-form";
import { ModalMode } from "../../types/Modal";
import { Customer as CustomerType, CustomerData } from "../../types/customer";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import TextField from "../TextField/TextField";
import { emailRegex, phoneNumberRegex } from "../../utils/regex";
import { useCustomer } from "../../hooks/useCustomer";
import { useEffect, useState } from "react";
import axiosClient from "../../config/axiosClient";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import styles from "./CustomerForm.module.css";
import { useAuth } from "../../context/AuthContext";
type Props = {
  mode: ModalMode;
  id: string;
  onClose: (update?: boolean) => void;
};

export default function CustomerForm({ id, mode, onClose }: Props) {
    const { token} = useAuth();
  const { customer } = useCustomer(id);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<CustomerData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
    },
  });

  // save customer
  const { isLoading: isSaving, mutate } = useMutation(
    (customerData: CustomerData) => {
      if (id) {
        return axiosClient.put<CustomerType>(`/customers/${id}`, customerData, {
          headers: {
        Authorization: `Bearer ${token}`
      }
        });
      }
      return axiosClient.post<CustomerType>("/customers", customerData, {
        headers: {
        Authorization: `Bearer ${token}`
      }
      });
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

  const onSubmit = (data: CustomerData) => {
    mutate(data);
  };

  useEffect(() => {
    if (customer?.id) {
      console.log("Customer rerender");
      setValue("name", customer.name);
      setValue("email", customer.email || "");
      setValue("phoneNumber", customer.phoneNumber || "");
      setValue("location", customer.location);
    }
  }, [customer, setValue]);

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
        <TextField<CustomerData>
          id="name"
          label="Name"
          error={errors.name}
          name="name"
          register={register}
          required
          options={{
            required: "Name is required",
            validate: {
              maxLength: (v) =>
                v.length <= 255 || "Name have a max length of 255 characters",
            },
          }}
        />

        <TextField<CustomerData>
          id="email"
          label="Email"
          error={errors.email}
          name="email"
          register={register}
          options={{
            validate: {
              maxLength: (v) =>
                !v ||
                v.length <= 50 ||
                "Email have a max length of 50 characters",
              matchPattern: (v) =>
                !v || emailRegex.test(v) || "Email must be a valid",
            },
          }}
        />

        <TextField<CustomerData>
          id="phoneNumber"
          label="Phone Number"
          error={errors.phoneNumber}
          name="phoneNumber"
          register={register}
          options={{
            required: false,
            validate: {
              maxLength: (v) =>
                !v ||
                v.length <= 20 ||
                "Phone Number have a max length of 20 characters",
              matchPattern: (v) =>
                !v ||
                phoneNumberRegex.test(v) ||
                "Phone Number must be a valid e.g: 1 (703) 567-4510",
            },
          }}
        />

        <TextField<CustomerData>
          id="shipping-address"
          label="Shipping Address"
          error={errors.location}
          name="location"
          placeholder="Street, State/Parish, Country"
          register={register}
          options={{
            required: "Shipping Address is required",
          }}
        />
      </form>

      <p className={styles.formError}>{formError && formError}</p>
    </Modal>
  );
}
