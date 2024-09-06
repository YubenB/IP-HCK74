import { Avatar, Button, Textarea } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

const PostDetailView = ({
  post,
  liked,
  user,
  countLike,
  loading,
  isLoggedIn,
  timeAgo,
  handleCommentSubmit,
  onCommentChange,
  commentText,
  handleLikeClick,
  handleDeleteClick,
}) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Loading" size="xl" />
        </div>
      )}
      <Link
        to="/"
        className="text-lg inline-block text-blue-500 hover:text-blue-700 font-semibold mb-2"
      >
        ← Go Back
      </Link>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-auto">
        {/* Post Header */}
        <div className="flex items-center mb-6">
          <Avatar
            img={post.User?.Profile.profilePicture}
            alt={post.User?.username}
            className="mr-4"
            rounded={true}
          />
          <div>
            <h2 className="text-lg font-semibold">{post.User?.username}</h2>
            <p className="text-sm text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
          {isLoggedIn && user.user?.id === post.UserId && (
            <button
              onClick={handleDeleteClick}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        {/* Post Image and Caption */}
        {post.imgUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={post.imgUrl}
              alt="Post Image"
              className="rounded-lg max-h-[400px] object-contain"
            />
          </div>
        )}

        <p className="text-gray-800 mb-6">{post.caption}</p>

        {/* Like Button */}
        <div className="flex items-center mb-6">
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

        {/* Add new comment */}
        {isLoggedIn ? (
          <form className="mb-6" onSubmit={handleCommentSubmit}>
            <Textarea
              placeholder="Add a comment..."
              rows={3}
              className="mb-4"
              shadow={true}
              onChange={onCommentChange}
              value={commentText}
              disabled={!isLoggedIn}
            />
            <Button
              disabled={commentText.length === 0}
              type="submit"
              className="bg-blue-500"
            >
              Post Comment
            </Button>
          </form>
        ) : (
          <p className="text-gray-600 mb-6">Please log in to post a comment.</p>
        )}

        {/* Comments Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Comments</h3>
          {post.Comments && post.Comments.length > 0 ? (
            post.Comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start justify-between mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-start">
                  <Avatar
                    img={comment.User.Profile.profilePicture}
                    alt={comment.User.username}
                    className="mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{comment.User.username}</h4>
                    <p className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 break-all">
                      {comment.commentText}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetailView;
