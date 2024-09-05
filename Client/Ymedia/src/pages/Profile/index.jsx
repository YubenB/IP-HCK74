import ProfileView from "./view";
import { useSelector } from "react-redux";
import timeAgo from "../../utils/helpers/timeNow";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user } = useSelector((store) => store.user);
  const { isLoggedIn } = useSelector((store) => store.isLoggedIn);

  return (
    <ProfileView
      user={user}
      timeAgo={timeAgo}
      isLoggedIn={isLoggedIn}
      posts={user.Posts}
    />
  );
};

export default ProfilePage;
