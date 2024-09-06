import axios from "axios";

function getToken() {
  return localStorage.getItem("token");
}

const postLogin = async (emailOrUsername, password) => {
  const response = await axios({
    method: "POST",
    url: "https://ymedia.yubenbauty.site/login",
    data: { emailOrUsername, password },
  });

  return response;
};

const postRegister = async (email, username, password) => {
  const response = await axios({
    method: "POST",
    url: "https://ymedia.yubenbauty.site/register",
    data: { email, username, password },
  });

  return response;
};

const postGoogleAuth = async (googleToken) => {
  const response = await axios({
    method: "POST",
    url: "https://ymedia.yubenbauty.site/login/google",
    data: { googleToken },
  });

  return response;
};

const getUser = async () => {
  const response = await axios({
    method: "GET",
    url: "https://ymedia.yubenbauty.site/user",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const getAllPosts = async (currentPage, filter) => {
  try {
    let option = ``;

    if (currentPage) option += `page=${currentPage}`;
    if (filter) option += `&filter[UserId]=${filter}`;
    const response = await axios({
      method: "GET",
      url: `https://ymedia.yubenbauty.site/posts?${option}`,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw error;
  }
};

const getPostDetail = async (postId) => {
  const response = await axios({
    method: "GET",
    url: `https://ymedia.yubenbauty.site/posts/detail/${postId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const createPost = async (formData) => {
  const response = await axios({
    method: "POST",
    url: "https://ymedia.yubenbauty.site/posts",
    data: formData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const deletePost = async (postId) => {
  const response = await axios({
    method: "delete",
    url: `https://ymedia.yubenbauty.site/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const postLike = async (postId) => {
  const response = await axios({
    method: "POST",
    url: `https://ymedia.yubenbauty.site/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const postComment = async (commentText, PostId) => {
  const response = await axios({
    method: "POST",
    url: "https://ymedia.yubenbauty.site/comment/post",
    data: { commentText, PostId },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const updateProfile = async (formData) => {
  const response = await axios({
    method: "PUT",
    url: "https://ymedia.yubenbauty.site/profile/edit",
    data: formData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const getAiResponse = async () => {
  const response = await axios({
    method: "GET",
    url: "https://ymedia.yubenbauty.site/ai",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

export {
  updateProfile,
  deletePost,
  getAiResponse,
  postLogin,
  postRegister,
  postGoogleAuth,
  getUser,
  getAllPosts,
  createPost,
  postLike,
  getPostDetail,
  postComment,
};
