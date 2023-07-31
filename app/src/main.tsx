import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import CustomerOrders from "./pages/CustomerOrders/CustomerOrders.tsx";
import "@fontsource/roboto/index.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { Role } from "./types/user.ts";
import CustomerDetails from "./pages/CustomerDetails/CustomerDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="./login" /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "manage-customers",
        element: <ProtectedRoute element={<CustomerOrders />} role={Role.ADMIN}/>,
      },
      {
        path: "manage-customers/:id",
        element: <ProtectedRoute element={<CustomerDetails />} role={Role.ADMIN}/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
