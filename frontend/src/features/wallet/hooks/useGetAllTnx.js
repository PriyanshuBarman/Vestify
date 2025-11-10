import { useQuery } from "@tanstack/react-query";
import { fetchAllTnx } from "../api/wallet";

export function useGetAllTnx() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchAllTnx,
    staleTime: 0,
  });
}
