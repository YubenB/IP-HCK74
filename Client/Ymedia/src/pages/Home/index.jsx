import HomePageView from "./view";
import { useEffect, useState, useCallback } from "react";
import { checkLoggedIn } from "../../features/userLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../utils/api";
import timeAgo from "../../utils/helpers/timeNow";

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [allJob, setAllJob] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { isLoggedIn } = useSelector((store) => store.isLoggedIn);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchAllPost = useCallback(async () => {
    try {
      const { data } = await getAllPosts(currentPage);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setAllJob([...allJob, ...data.posts]);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleImageRemove = () => {
    setImage(null);
    document.getElementById("file-input").value = "";
  };

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("imgUrl", image);

    try {
      await createPost(formData);
      setCaption("");
      setImage(null);
      fetchAllPost();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(checkLoggedIn());
    fetchAllPost();
  }, [dispatch, fetchAllPost]);

  return (
    <HomePageView
      fetchData={fetchAllPost}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalItems={totalItems}
      totalPages={totalPages}
      loading={loading}
      allJob={allJob}
      isLoggedIn={isLoggedIn}
      user={user}
      image={image}
      timeAgo={timeAgo}
      handleImageChange={handleImageChange}
      handleImageRemove={handleImageRemove}
      handleLikeClick={handleLikeClick}
      caption={caption}
      setCaption={setCaption}
      onFormSubmit={onFormSubmit}
      liked={liked}
    />
  );
};

export default HomePage;
