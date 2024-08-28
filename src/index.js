import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../src/pages/login/LoginPage";
import Register from "../src/pages/register/RegisterPage";
import Dashboard from "../src/pages/Dasboard/DashboardPage";
import Profile from "../src/pages/Profile/ProfilePage";
import FormPage from "../src/pages/Form/formPage";
import ResultPage from "../src/pages/Result/ResultPage";
import store from "../src/state/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import UserListPage from "./pages/UserList/UserListPage";

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
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <div>404 Not found</div>,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <div>404 Not found</div>,
  },
  {
    path: "/form",
    element: <FormPage />,
    errorElement: <div>404 Not found</div>,
  },
  {
    path: "/result",
    element: <ResultPage />,
    errorElement: <div>404 Not found</div>,
  },
  {
    path: "/usersList",
    element: <UserListPage />,
    errorElement: <div>404 Not found</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
