import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import OperatorRootLayout from "./layouts/OperatorRootLayout";
import NotFoundPage from "../pages/NotFoundPage";
import SellerSignupRequestPage from "@/signup-request/pages/SellerSignupRequestPage";
import SellerSignupPage from "@/signup/pages/SellerSignupPage";
import SellerPage from "@/operator/pages/SellerPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import WithValidGuid from "./WithValidGuid";
import SellerDetailsPage from "@/operator/pages/SellerDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/signup-request/:transactionId",
        element: (
          <WithValidGuid paramName="transactionId" fallbackPath="/not-found">
            <SellerSignupRequestPage />
          </WithValidGuid>
        ),
      },
      {
        path: "/seller-signup/:transactionId",
        element: (
          <WithValidGuid paramName="transactionId" fallbackPath="/not-found">
            <SellerSignupPage />
          </WithValidGuid>
        ),
      },
    ],
  },
  {
    path: "/operator",
    element: <OperatorRootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <SellerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller-details",
        element: (
          <ProtectedRoute>
            <SellerDetailsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/operator/login",
    element: <LoginPage />,
  },
]);

export default router;
