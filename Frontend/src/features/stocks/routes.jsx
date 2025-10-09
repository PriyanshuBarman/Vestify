import { lazy } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));

export const stocksRoutes = {
  path: "stocks",
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};
