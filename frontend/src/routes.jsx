import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/layouts/Layout";
import { authRoutes } from "./features/auth/routes";
import { mutualFundRoutes } from "./features/mutual-fund/routes";
import { communityRoutes } from "./features/community/routes";
import SearchPage from "./features/search/pages/Page";
import { walletRoutes } from "./features/wallet/routes";
import ProfilePage from "./pages/ProfilePage";
import PublicLayout from "./components/layouts/PublicLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const DeleteAccountPage = lazy(() => import("./pages/DeleteAccountPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ReferAndEarnPage = lazy(() => import("./pages/ReferAndEarnPage"));
const ActiveDevicesPage = lazy(() => import("./pages/ActiveDevicesPage"));
const AllOrdersPage = lazy(
  () => import("./features/mutual-fund/pages/AllOrdersPage"),
);
const VerifyEmailChangeOTPPage = lazy(
  () => import("./pages/VerifyEmailChangeOTPPage"),
);
const ClearCachePage = lazy(() => import("./pages/ClearCachePage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ChangePinPage = lazy(() => import("./pages/ChangePinPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ChangeEmailPage = lazy(() => import("./pages/ChangeEmailPage"));
const AccountDetailsPage = lazy(() => import("./pages/AccountDetailsPage"));
const EditFieldPage = lazy(() => import("./pages/EditFieldPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const SearchUserPage = lazy(() => import("./pages/SearchUserPage"));

export const routes = createBrowserRouter([
  authRoutes,
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      walletRoutes,
      mutualFundRoutes,
      communityRoutes,
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/search-user",
        element: <SearchUserPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/orders",
        element: <AllOrdersPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/account-details",
        element: <AccountDetailsPage />,
      },
      {
        path: "/edit-field/:field",
        element: <EditFieldPage />,
      },
      {
        path: "/change-email",
        element: <ChangeEmailPage />,
      },
      {
        path: "/verify-email-change-otp",
        element: <VerifyEmailChangeOTPPage />,
      },
      {
        path: "/refer-and-earn",
        element: <ReferAndEarnPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/settings",
        children: [
          {
            index: true,
            element: <SettingsPage />,
          },
          {
            path: "change-pin",
            element: <ChangePinPage />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
          {
            path: "active-devices",
            element: <ActiveDevicesPage />,
          },
          {
            path: "delete-account",
            element: <DeleteAccountPage />,
          },
          {
            path: "clear-cache",
            element: <ClearCachePage />,
          },
        ],
      },
    ],
  },
]);
