import { useQuery } from "react-query";
import axiosClient from "../config/axiosClient";
import { Flower } from "../types/flower";
import { useAuth } from "../context/AuthContext";

export const useFlowers = () => {
  const { token } = useAuth();
  const { data, isLoading, refetch } = useQuery("flowers", async () => {
    return axiosClient.get<Flower[]>("/flowers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  return {
    flowers: data?.data,
    isLoading,
    refetch,
  };
};
