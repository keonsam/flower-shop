import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Pagination } from "../types/pagination";
import { Customers } from "../types/customer";
import { useAuth } from "../context/AuthContext";

export const useCustomers = ({
  pageNumber,
  pageSize,
  sort,
  search,
}: Pagination) => {
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

  const queryStr = query.join("&");

  const { data, isLoading, refetch } = useQuery(
    ["customers", queryStr],
    async () => {
      return axiosClient.get<Customers>(`/customers?${queryStr}`, {
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
    customers: data?.data,
    isLoading,
    refetch,
  };
};
