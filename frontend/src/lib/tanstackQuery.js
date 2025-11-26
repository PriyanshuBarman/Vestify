import { TZDate } from "@date-fns/tz";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import {
  addDays,
  differenceInMilliseconds,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

const getSmartStaleTime = () => {
  const istTime = TZDate.tz("Asia/Kolkata");
  const hour = istTime.getHours();

  if (hour >= 1 && hour < 7) return 15 * 60 * 1000; // 15 minutes

  let nextRun = setSeconds(setMinutes(setHours(istTime, 1), 0), 0);
  if (hour >= 1) nextRun = addDays(nextRun, 1);

  return differenceInMilliseconds(nextRun, istTime);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: () => getSmartStaleTime(),
      gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      retry: false,
      retryOnMount: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export { queryClient, persister };
