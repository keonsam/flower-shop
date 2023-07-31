import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Order } from "../types/order";

export const useOrder = (id: string) => {
  const { data, isLoading, isError, error } = useQuery(
    `orders/${id}`,
    async () => {
      return axiosClient.get<Order>(`/orders/${id}`);
    }
  );

  return {
    order: data?.data,
    isLoading,
    isError,
    error,
  };
};
