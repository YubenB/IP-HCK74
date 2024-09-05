import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../utils/api";

const initialState = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  posts: [],
};

export const allPostsSlice = createSlice({
  name: "allPosts", // Changed to plural for clarity
  initialState,
  reducers: {
    setPosts: (state, action) => {
      // Adding new posts to the existing posts array
      state.posts = [...state.posts, ...action.payload];
    },
    // You can add more reducers like setTotalItems, setCurrentPage, etc.
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Export the actions for use in components
export const { setPosts, setTotalItems, setCurrentPage } =
  allPostsSlice.actions;

// Export the reducer to include in the store
export default allPostsSlice.reducer;

export const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      let { data } = await getAllPosts();
      console.log(data, "HUHU????");

      dispatch(setPosts(data.posts));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
