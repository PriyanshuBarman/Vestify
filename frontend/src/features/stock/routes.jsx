import { lazy } from "react";

import PopularStocksPage from "./pages/PopularStocksPage";

const Layout = lazy(() => import("./components/Layout"));
const Page = lazy(() => import("./pages/Page"));
const HoldingDetailsPage = lazy(() => import("./pages/HoldingDetailsPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const BuySellPage = lazy(() => import("./pages/BuySellPage"));
const TriggerOrderPage = lazy(() => import("./pages/TriggerOrderPage"));
const ConfirmCancelPage = lazy(() => import("./pages/ConfirmCancelPage"));
const StockPage = lazy(() => import("./pages/StockPage"));
const FiftyTwoWeekHighLowPage = lazy(
  () => import("./pages/FiftyTwoWeekHighLowPage"),
);
const TopByVolumePage = lazy(() => import("./pages/TopByVolumePage"));
const TopMoversPage = lazy(() => import("./pages/TopMoversPage"));

export const stockRoutes = {
  path: "/stocks",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Page />,
    },
    {
      path: "popular",
      element: <PopularStocksPage />,
    },
    {
      path: "52-week-high-low",
      element: <FiftyTwoWeekHighLowPage />,
    },
    {
      path: "top-by-volume",
      element: <TopByVolumePage />,
    },
    {
      path: "high-volume",
      element: <TopByVolumePage />,
    },
    {
      path: "top-movers",
      element: <TopMoversPage />,
    },
    {
      path: "holding-details",
      element: <HoldingDetailsPage />,
    },
    {
      path: "orders/:orderId",
      element: <OrderDetailsPage />,
    },
    {
      path: "buysell",
      element: <BuySellPage />,
    },
    {
      path: "gtt-order/:symbol",
      element: <TriggerOrderPage />,
    },
    {
      path: "confirm-cancel",
      element: <ConfirmCancelPage />,
    },
    {
      path: ":symbol",
      element: <StockPage />,
    },
  ],
};
