import PropTypes from "prop-types";
import { FaThumbsUp, FaThumbsUp as FaThumbsUpSolid } from "react-icons/fa";
import { Card, Avatar, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { postLike } from "../../utils/api";
import { Link } from "react-router-dom";

export default function PostCard({
  username,
  caption,
  imgUrl,
  profilePicture,
  totalLikes,
  likes,
  postId,
  userId,
  postDate,
  timeAgo,
  isLoggedIn,
}) {
  const [liked, setLiked] = useState(false);
  const [countLike, setCountLike] = useState(totalLikes);
  console.log(userId);

  useEffect(() => {
    setLiked(likes.some((like) => like === userId));
  }, [likes, userId]);

  const fetchLike = async () => {
    try {
      await postLike(postId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeClick = () => {
    fetchLike();
    liked ? setCountLike(countLike - 1) : setCountLike(countLike + 1);
    setLiked(!liked);
  };

  return (
    <Card className="shadow-lg rounded-lg max-h-[620px] flex flex-col mb-8">
      <Link to={`/postdetail/${postId}`}>
        <div className="flex items-center space-x-4">
          <Avatar
            img={profilePicture}
            rounded={true}
            alt={`${username}'s Profile`}
          />
          <div>
            <h3 className="text-lg font-semibold">{username}</h3>
            <p className="text-sm text-gray-500">{timeAgo(postDate)}</p>
          </div>
        </div>
        {imgUrl && (
          <div className="flex-grow overflow-hidden max-h-[350px] flex justify-center mt-4 items-center">
            <img
              src={imgUrl}
              alt="Post Image"
              className="mt-4 rounded-lg object-contain max-h-full"
            />
          </div>
        )}
        <p className="text-gray-700 mt-4">{caption}</p>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <Button
          disabled={!isLoggedIn}
          color={liked ? "light" : "primary"}
          onClick={handleLikeClick}
          className="flex items-center space-x-2 "
        >
          <svg
            className={`w-6 h-6 ${liked ? "text-red-500" : "text-gray-500"}`}
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.02 4.02 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 17.98 4 20 6.02 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm">{countLike}</span>
        </Button>
      </div>
    </Card>
  );
}

PostCard.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.string,
  imgUrl: PropTypes.string,
  profilePicture: PropTypes.string,
  totalLikes: PropTypes.number,
  likes: PropTypes.arrayOf(PropTypes.number),
  postId: PropTypes.number,
  userId: PropTypes.number,
  postDate: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  timeAgo: PropTypes.func,
};
