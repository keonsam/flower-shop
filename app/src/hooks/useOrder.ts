import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Order } from "../types/order";
import { useAuth } from "../context/AuthContext";

export const useOrder = (id: string) => {
  const { token } = useAuth();
  const { data, isLoading, isError, error } = useQuery(
    `orders/${id}`,
    async () => {
      return axiosClient.get<Order>(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  );

  return {
    order: data?.data,
    isLoading,
    isError,
    error,
  };
};
