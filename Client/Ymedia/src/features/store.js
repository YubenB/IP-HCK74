import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userLoginReducer from "./userLoginSlice";
import allPostsReducer from "./postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    isLoggedIn: userLoginReducer,
    allPosts: allPostsReducer,
  },
});

export default store;
