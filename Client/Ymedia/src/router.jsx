import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/Home";
import RightSideBar from "./components/Organism/RightSideBar";
import LeftSideBar from "./components/Organism/LeftSideBar";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([
  {
    element: (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Outlet />
      </GoogleOAuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: (
      <div className="flex min-h-screen bg-gray-100 mx-32">
        <LeftSideBar />
        <div
          className="w-1/2 bg-white p-4 flex-1 h-screen overflow-y-auto"
          id="check"
        >
          <Outlet />
        </div>
        <RightSideBar />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/postdetail/:id",
        element: <PostDetail />,
      },
      // loader: () => {
      //   if (!localStorage.getItem("token")) {
      //     return redirect("/login");
      //   }
      //   return null;
      // },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
