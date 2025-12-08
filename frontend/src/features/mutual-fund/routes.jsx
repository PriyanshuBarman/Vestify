import { lazy } from "react";
import Page from "./pages/Page";

const RedemptionRequestSuccessPage = lazy(
  () => import("./pages/RedemptionRequestSuccessPage"),
);
const InvestmentDetailsPage = lazy(
  () => import("./pages/InvestmentDetailsPage"),
);
const ManagerFundsPage = lazy(() => import("./pages/ManagerFundsPage"));
const FundHousesPage = lazy(() => import("./pages/FundHousesPage"));
const AmcFundsPage = lazy(() => import("./pages/AmcFundsPage"));
const SipDetailsPage = lazy(() => import("./pages/SipDetailsPage"));
const EditSipPage = lazy(() => import("./pages/EditSipPage"));
const InvestPage = lazy(() => import("./pages/InvestPage"));
const RedeemPage = lazy(() => import("./pages/RedemptionPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const FundPage = lazy(() => import("./pages/FundPage"));
const AllFundsPage = lazy(() => import("./pages/AllFundsPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const CompareFundsPage = lazy(() => import("./pages/CompareFundsPage"));
const SipCalculatorPage = lazy(() => import("./pages/SipCalculatorPage"));
const Layout = lazy(() => import("./components/Layout"));

export const mutualFundRoutes = {
  path: "/mutual-funds",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Page />,
    },
    {
      path: "investment-details",
      element: <InvestmentDetailsPage />,
    },
    {
      path: "invest",
      element: <InvestPage />,
    },
    {
      path: "redeem",
      element: <RedeemPage />,
    },
    {
      path: "redeem-success",
      element: <RedemptionRequestSuccessPage />,
    },
    {
      path: "collections",
      element: <CollectionPage />,
    },
    {
      path: ":scheme_code",
      element: <FundPage />,
    },
    {
      path: "compare-funds",
      element: <CompareFundsPage />,
    },
    {
      path: "all-funds",
      element: <AllFundsPage />,
    },
    {
      path: "orders/:orderId",
      element: <OrderDetailsPage />,
    },
    {
      path: "sip/:sipId",
      element: <SipDetailsPage />,
    },
    {
      path: "edit/sip/:sipId",
      element: <EditSipPage />,
    },
    {
      path: "sip-calculator",
      element: <SipCalculatorPage />,
    },
    {
      path: "fund-houses",
      element: <FundHousesPage />,
    },
    {
      path: "amc-funds/:amcCode",
      element: <AmcFundsPage />,
    },
    {
      path: "fund-manager/:managerName",
      element: <ManagerFundsPage />,
    },
  ],
};
