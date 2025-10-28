import { lazy } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));

export const stockRoutes = {
  path: "stocks",
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};
