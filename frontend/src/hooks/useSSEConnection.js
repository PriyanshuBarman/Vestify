import { VITE_BACKEND_BASE_URL } from "@/config/env";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSSEConnection() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Open SSE connection
    const eventSource = new EventSource(`${VITE_BACKEND_BASE_URL}/events`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.setQueryData(["balance"], data.balance);
      } catch (err) {
        console.error("Failed to parse SSE event", err);
      }
    };

    // Close SSE connection on unmount
    return () => {
      eventSource.close();
    };
  }, [queryClient]);
}
