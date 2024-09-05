import { useParams } from "react-router-dom";
import { getPostDetail, postComment } from "../../utils/api";
import PostDetailView from "./view";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import timeAgo from "../../utils/helpers/timeNow";
import { postLike } from "../../utils/api";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { user } = useSelector((store) => store.user);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const { isLoggedIn } = useSelector((store) => store.isLoggedIn);
  const { id } = useParams();

  const fetchPostDetail = async () => {
    try {
      const { data } = await getPostDetail(id);
      setPost(data);
      setLiked(data.likes.some((like) => like === user.id));
      setCountLike(data.totalLikes);
    } catch (error) {
      console.log(error);
    }
  };

  const onCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (commentText.length === 0) throw { name: "Kocak gaboleh" };
      await postComment(commentText, post.id);
      setCommentText("");
      fetchPostDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLike = async () => {
    try {
      await postLike(post.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeClick = () => {
    console.log("clikced");

    fetchLike();
    liked ? setCountLike(countLike - 1) : setCountLike(countLike + 1);
    setLiked(!liked);
  };

  useEffect(() => {
    setLiked(post.likes?.some((like) => like === user.id) ?? false);
  }, []);

  useEffect(() => {
    fetchPostDetail();
  }, [user]);

  return (
    <PostDetailView
      handleCommentSubmit={handleCommentSubmit}
      handleLikeClick={handleLikeClick}
      liked={liked}
      countLike={countLike}
      onCommentChange={onCommentChange}
      commentText={commentText}
      timeAgo={timeAgo}
      post={post}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default PostDetail;
