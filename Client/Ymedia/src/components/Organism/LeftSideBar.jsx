import { Avatar } from "flowbite-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/userSlice";
import { checkLoggedIn } from "../../features/userLoginSlice";
import { Link } from "react-router-dom";

export default function LeftSideBar() {
  const { user } = useSelector((store) => store.user);
  const { isLoggedIn } = useSelector((store) => store.isLoggedIn);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(checkLoggedIn());
  };

  useEffect(() => {
    dispatch(checkLoggedIn());
    if (isLoggedIn) {
      dispatch(fetchUser());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="w-1/4 bg-white p-4 border-r">
      {isLoggedIn && (
        <div className="mb-6 flex gap-4 ">
          <Avatar img="" alt="Profile Picture" rounded={true} />
          <p className="mt-4 text-lg font-semibold">{user.username}</p>
        </div>
      )}
      <nav className="space-y-4">
        <Link
          to="/"
          className="block text-lg font-medium text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to={isLoggedIn ? `/profile/${user.username}` : `/login`}
          className="block text-lg font-medium text-gray-700 hover:text-blue-600"
        >
          Profile
        </Link>
        <a
          href="#"
          className="block text-lg font-medium text-gray-700 hover:text-blue-600"
        >
          Notifications
        </a>
        <a
          href="#"
          className="block text-lg font-medium text-gray-700 hover:text-blue-600"
        >
          Friends
        </a>
        <a
          href="#"
          className="block text-lg font-medium text-gray-700 hover:text-blue-600"
        >
          Settings
        </a>
        {isLoggedIn ? (
          <Link
            onClick={handleLogOut}
            to="/"
            className="block text-lg font-medium text-gray-700 hover:text-blue-600"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="block text-lg font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}
