import { lazy } from "react";
import Layout from "./components/Layout";

const Page = lazy(() => import("./pages/Page"));
const ProfilePage = lazy(() => import("./pages/UserProfilePage"));
const SipDetailsPage = lazy(
  () => import("../mutual-fund/pages/SipDetailsPage"),
);
const OrderDetailsPage = lazy(
  () => import("../mutual-fund/pages/OrderDetailsPage"),
);

export const communityRoutes = {
  path: "community",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Page />,
    },
    {
      path: ":username",
      element: <ProfilePage />,
    },
    {
      path: ":username/sips/:sipId",
      element: <SipDetailsPage />,
    },
    {
      path: "orders/:orderId",
      element: <OrderDetailsPage />,
    },
  ],
};
