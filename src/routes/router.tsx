import { createBrowserRouter } from "react-router-dom";
import { ProductsListPage } from "../pages/products/products-list"
import { ProductDetailsPage } from "../pages/products/product-details";
import { RootPage } from "../pages";
import { ProductDeletePage } from "../pages/products/product-delete";
import { ProductCreatePage } from "../pages/products/product-create";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootPage />
    },
    {
      path: "/products",
      element: <ProductsListPage />,
      children: [
      {
        path: "/products/delete/:productId",
        element: <ProductDeletePage />
      },
      {
        path: "/products/create",
        element: <ProductCreatePage />,
      },
    ]
    },
    {
      path: "/products/view/:productId",
      element: <ProductDetailsPage />,
      children: [{
        path: "/products/view/:productId/delete",
        element: <ProductDeletePage />
      }]
    }
  ]
);