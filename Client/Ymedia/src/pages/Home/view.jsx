import PropTypes from "prop-types";
import NewPostCard from "../../components/Molecules/NewPostCard";
import PostCard from "../../components/Molecules/PostCard";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePageView = ({
  user,
  allJob,
  isLoggedIn,
  image,
  handleImageChange,
  handleImageRemove,
  handleLikeClick,
  liked,
  caption,
  setCaption,
  loading,
  fetchData,
  totalPages,
  timeAgo,
  totalItems,
  currentPage,
  setCurrentPage,
  onFormSubmit,
}) => {
  console.log(`Current page1: ${currentPage}`);
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Loading" size="xl" />
        </div>
      )}

      <div className="space-y-6">
        <InfiniteScroll
          dataLength={allJob.length} //This is important field to render the next data
          next={() => setCurrentPage((value) => value + 1)}
          hasMore={currentPage != totalPages}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          onScroll={() => console.log("apaan")}
          height={1000}
          scrollThreshold={0.99}
        >
          {isLoggedIn && (
            <NewPostCard
              username={user.username}
              profilePicture={user.profilePicture}
              image={image}
              handleImageChange={handleImageChange}
              handleImageRemove={handleImageRemove}
              caption={caption}
              setCaption={setCaption}
              onFormSubmit={onFormSubmit}
            />
          )}
          {allJob &&
            allJob.map((post) => (
              <PostCard
                key={post.id}
                isLoggedIn={isLoggedIn}
                postId={post.id}
                likes={post.likes}
                userId={user.id}
                caption={post.caption}
                username={post.User?.username}
                profilePicture={post.Profile?.profilePicture}
                imgUrl={post.imgUrl}
                totalLikes={post.totalLikes}
                postDate={post.createdAt}
                handleLikeClick={handleLikeClick}
                liked={liked}
                timeAgo={timeAgo}
              />
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

HomePageView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  allJob: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  image: PropTypes.string,
  handleImageChange: PropTypes.func,
  handleImageRemove: PropTypes.func,
  handleLikeClick: PropTypes.func,
  liked: PropTypes.bool,
  caption: PropTypes.string,
  setCaption: PropTypes.func,
  loading: PropTypes.bool,
  onFormSubmit: PropTypes.func,
};

export default HomePageView;
