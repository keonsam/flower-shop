import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Customer } from "../types/customer";
import { useAuth } from "../context/AuthContext";

export const useCustomer = (id?: string) => {
    const { token } = useAuth();
  const { data, isLoading, isError, error } = useQuery(
    `customers/${id}`,
    async () => {
      return axiosClient.get<Customer>(`/customers/${id}`, {
            headers: {
        Authorization: `Bearer ${token}`
      }});
    }
  );

  return {
    customer: data?.data,
    isLoading,
    isError,
    error
  };
};
