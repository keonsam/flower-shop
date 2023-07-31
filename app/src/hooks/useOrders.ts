import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Pagination } from "../types/pagination";
import { Customers } from "../types/customer";
import { Orders } from "../types/order";
import { useAuth } from "../context/AuthContext";

export const useOrders = ({
  pageNumber,
  pageSize,
  sort,
  search,
}: Pagination, customerId?: string) => {
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

  const { data, isLoading, refetch } = useQuery("orders", async () => {
    return axiosClient.get<Orders>(`/orders?${query.join("&")}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  });

  return {
    orders: data?.data,
    isLoading,
    refetch,
  };
};
