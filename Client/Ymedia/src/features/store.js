import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userLoginReducer from "./userLoginSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    isLoggedIn: userLoginReducer,
  },
});

export default store;
