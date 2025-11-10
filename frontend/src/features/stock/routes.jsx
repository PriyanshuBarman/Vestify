import { lazy } from "react";
const Page = lazy(() => import("./pages/Page"));

export const stockRoutes = {
  path: "stocks",
  children: [
    {
      index: true,
      element: <Page />,
    },
  ],
};
