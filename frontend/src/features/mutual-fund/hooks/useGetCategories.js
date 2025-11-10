import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/external";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
