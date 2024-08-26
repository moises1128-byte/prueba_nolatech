import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../src/pages/login/LoginPage";
import Register from "../src/pages/register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>404 Not found</div>,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <div>404 Not found</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
