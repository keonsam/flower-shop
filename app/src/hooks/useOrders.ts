import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Pagination } from "../types/pagination";
import { Orders } from "../types/order";
import { useAuth } from "../context/AuthContext";

export const useOrders = (
  { pageNumber, pageSize, sort, search }: Pagination,
  customerId?: string
) => {
  const { token } = useAuth();
  const query: string[] = [];
  if (pageNumber) {
    query.push(`pageNumber=${pageNumber}`);
  }

  if (pageSize) {
    query.push(`pageSize=${pageSize}`);
  }

  if (sort) {
    query.push(`sort=${sort}`);
  }

  if (search) {
    query.push(`search=${search}`);
  }

  if (customerId) {
    query.push(`customerId=${customerId}`);
  }

  const queryStr = query.join("&");

  const { data, isLoading, refetch } = useQuery(
    ["orders", queryStr],
    async () => {
      return axiosClient.get<Orders>(`/orders?${queryStr}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      keepPreviousData: true,
    }
  );

  return {
    orders: data?.data,
    isLoading,
    refetch,
  };
};
