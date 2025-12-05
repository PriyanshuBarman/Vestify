import LoadingState from "@/components/LoadingState";
import { lazy, Suspense } from "react";
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
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <InvestmentDetailsPage />
        </Suspense>
      ),
    },
    {
      path: "invest",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <InvestPage />
        </Suspense>
      ),
    },
    {
      path: "redeem",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <RedeemPage />
        </Suspense>
      ),
    },
    {
      path: "redeem-success",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <RedemptionRequestSuccessPage />
        </Suspense>
      ),
    },
    {
      path: "collections",
      element: <CollectionPage />,
    },
    {
      path: ":scheme_code",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <FundPage />
        </Suspense>
      ),
    },
    {
      path: "compare-funds",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <CompareFundsPage />
        </Suspense>
      ),
    },
    {
      path: "all-funds",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AllFundsPage />
        </Suspense>
      ),
    },
    {
      path: "orders/:orderId",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <OrderDetailsPage />
        </Suspense>
      ),
    },
    {
      path: "sip/:sipId",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <SipDetailsPage />
        </Suspense>
      ),
    },
    {
      path: "edit/sip/:sipId",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <EditSipPage />
        </Suspense>
      ),
    },
    {
      path: "sip-calculator",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <SipCalculatorPage />
        </Suspense>
      ),
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
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <ManagerFundsPage />
        </Suspense>
      ),
    },
  ],
};
