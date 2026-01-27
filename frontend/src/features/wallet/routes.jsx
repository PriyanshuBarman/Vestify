import LoadingState from "@/components/LoadingState";
import { lazy, Suspense } from "react";

const TnxDetailsPage = lazy(() => import("./pages/TnxDetailsPage"));
const TnxHistoryPage = lazy(() => import("./pages/TnxHistoryPage"));
const SendMoneyPage = lazy(() => import("./pages/SendMoneyPage"));
const Page = lazy(() => import("./pages/Page"));

export const walletRoutes = {
  path: "wallet",
  children: [
    {
      index: true,
      element: <Page />,
    },
    {
      path: "send",
      element: <SendMoneyPage />,
    },
    {
      path: "transactions",
      element: <TnxHistoryPage />,
    },
    {
      path: "tnx-details",
      element: <TnxDetailsPage />,
    },
  ],
};
