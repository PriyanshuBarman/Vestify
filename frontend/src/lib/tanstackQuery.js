import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      retry: false,
      retryOnMount: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export { persister, queryClient };
