import Layout from "./components/Layout";
import Page from "./pages/Page";
import StockPage from "./pages/StockPage";

export const stockRoutes = {
  path: "/stocks",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Page />,
    },
    {
      path: ":symbol",
      element: <StockPage />,
    },
  ],
};
