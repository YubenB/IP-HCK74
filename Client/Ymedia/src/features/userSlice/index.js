import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/api";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setUser, setError } = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      let { data } = await getUser();
      console.log(data);

      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
};
