import { lazy } from "react";

const TnxDetailsPage = lazy(() => import("./pages/TnxDetailsPage"));
const AllTnxPage = lazy(() => import("./pages/AllTnxPage"));
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
      element: <AllTnxPage />,
    },
    {
      path: "tnx-details",
      element: <TnxDetailsPage />,
    },
  ],
};
