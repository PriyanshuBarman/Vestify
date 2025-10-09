import LoadingState from "@/components/LoadingState";
import { lazy, Suspense } from "react";
import ManagerFundsPage from "./pages/ManagerFundsPage";
const FundHousesPage = lazy(() => import("./pages/FundHousesPage"));
const AmcFundsPage = lazy(() => import("./pages/AmcFundsPage"));
const MutualFundLayout = lazy(() => import("./components/MutualFundLayout"));
const SipDetailsPage = lazy(() => import("./pages/SipDetailsPage"));
const EditSipPage = lazy(() => import("./pages/EditSipPage"));
const InvestPage = lazy(() => import("./pages/InvestPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const FundPage = lazy(() => import("./pages/FundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AllFundsPage = lazy(() => import("./pages/AllFundsPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const CompareFundsPage = lazy(() => import("./pages/CompareFundsPage"));
const SipCalculatorPage = lazy(() => import("./pages/SipCalculatorPage"));

export const mutualFundRoutes = {
  path: "/mutual-funds",
  element: <MutualFundLayout />,
  children: [
    {
      index: true,
      element: (
        <Suspense
          fallback={<LoadingState fullPage className="h-[calc(100vh-250px)]" />}
        >
          <HomePage />
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
      path: "collections",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <CollectionPage />
        </Suspense>
      ),
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
      path: "order/:orderId",
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
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <FundHousesPage />
        </Suspense>
      ),
    },
    {
      path: "amc-funds/:amcCode",
      element: (
        <Suspense fallback={<LoadingState fullPage />}>
          <AmcFundsPage />
        </Suspense>
      ),
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
