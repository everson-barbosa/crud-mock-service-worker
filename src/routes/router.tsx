import { createBrowserRouter } from "react-router-dom";
import { ProductsListPage } from "../pages/products/products-list"
import { ProductDetailsPage } from "../pages/products/product-details";

export const router = createBrowserRouter(
  [
    {
      path: "/products",
      element: <ProductsListPage />,
    },
    {
      path: "/products/view/:productId",
      element: <ProductDetailsPage />,
    }
  ]
);