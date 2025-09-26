import LoadingState from "@/components/LoadingState";
import { lazy, Suspense } from "react";

const TnxHistoryPage = lazy(() => import("./pages/TnxHistoryPage"));
const SendMoneyPage = lazy(() => import("./pages/SendMoneyPage"));
const EnterAmountPage = lazy(() => import("./pages/EnterAmountPage"));
const WalletPage = lazy(() => import("./pages/WalletPage"));

export const walletRoutes = {
  path: "wallet",
  children: [
    {
      index: true,
      element: <WalletPage />,
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
  ],
};
