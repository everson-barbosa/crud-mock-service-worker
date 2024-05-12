import { createBrowserRouter } from "react-router-dom";
import { ProductsListPage } from "../pages/products/products-list";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ProductsListPage />,
    }
  ]
);