import LoadingState from "@/components/LoadingState";
import { lazy, Suspense } from "react";

const TnxDetailsPage = lazy(() => import("./pages/TnxDetailsPage"));
const TnxHistoryPage = lazy(() => import("./pages/TnxHistoryPage"));
const SendMoneyPage = lazy(() => import("./pages/SendMoneyPage"));
const EnterAmountPage = lazy(() => import("./pages/EnterAmountPage"));
const Page = lazy(() => import("./pages/Page"));

export const walletRoutes = {
  path: "wallet",
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <Page />,
        </Suspense>
      ),
    },
    {
      path: "send",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <SendMoneyPage />
        </Suspense>
      ),
    },
    {
      path: "enter-amount",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <EnterAmountPage />
        </Suspense>
      ),
    },
    {
      path: "transactions",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <TnxHistoryPage />
        </Suspense>
      ),
    },
    {
      path: "tnx-details",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <TnxDetailsPage />
        </Suspense>
      ),
    },
  ],
};
