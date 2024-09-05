import { createSlice } from "@reduxjs/toolkit";

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = userLoginSlice.actions;

export default userLoginSlice.reducer;

export const checkLoggedIn = () => {
  return (dispatch) => {
    if (!localStorage.getItem("token")) {
      dispatch(setIsLoggedIn(false));
    } else {
      dispatch(setIsLoggedIn(true));
    }
  };
};
