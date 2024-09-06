import { createBrowserRouter, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/Home";
import RightSideBar from "./components/Organism/RightSideBar";
import LeftSideBar from "./components/Organism/LeftSideBar";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedIn } from "./features/userLoginSlice";
import { fetchUser } from "./features/userSlice";

const FetchUser = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.isLoggedIn);

  useEffect(() => {
    dispatch(checkLoggedIn());
    if (isLoggedIn) {
      dispatch(fetchUser());
    }
  }, [dispatch, isLoggedIn]);
};

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
          <FetchUser />
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
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
