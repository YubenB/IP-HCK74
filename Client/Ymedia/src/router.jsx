import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    element: (
      <>
        <p>Ini navbar</p>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
