import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchUserData } from "@/api/user";

export const useGetUser = () => {
  const initialData = localStorage.getItem("USER_DATA");

  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    initialData: () => (initialData ? JSON.parse(initialData) : undefined),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.data) {
      localStorage.removeItem("USER_DATA");
    } else {
      localStorage.setItem("USER_DATA", JSON.stringify(query.data));
    }
  }, [query.data]);

  return query;
};
