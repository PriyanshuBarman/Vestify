import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import AuthGuard from "./components/AuthGuard";
import LoadingState from "./components/LoadingState";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutualfund/routes";
import { walletRoutes } from "./features/wallet/routes";
import Layout from "./components/layouts/Layout";
import ProfilePage from "./pages/ProfilePage";
import { stocksRoutes } from "./features/stocks/routes";

const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const MobileSearchPage = lazy(
  () => import("./features/search/pages/MobileSearchPage"),
);
const AllOrdersPage = lazy(
  () => import("./features/mutualfund/pages/AllOrdersPage"),
);
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      walletRoutes,
      stocksRoutes,
      mutualFundRoutes,
      {
        index: true,
        element: <Navigate to="/mutual-funds#explore" replace />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <MobileSearchPage />
          </Suspense>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <AllOrdersPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/coming-soon",
        element: (
          <Suspense fallback={<LoadingState fullPage />}>
            <ComingSoonPage />
          </Suspense>
        ),
      },
    ],
  },
  authRoutes,
]);
