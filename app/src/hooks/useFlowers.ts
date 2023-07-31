import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Flower } from "../types/flower";

export const useFlowers = () => {

  const { data, isLoading, refetch } = useQuery("flowers", async () => {
    return axiosClient.get<Flower[]>("/flowers");
  });

  return {
    flowers: data?.data,
    isLoading,
    refetch,
  };
};
