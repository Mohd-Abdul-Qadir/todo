import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    createUserSuccess: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const { createUserSuccess, loginSuccess, setError } = userSlice.actions;

// Create a new user
export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/create`, userData);
    dispatch(createUserSuccess(response.data));
  } catch (error) {
    dispatch(
      setError(error.response ? error.response.data.error : error.message)
    );
  }
};

// Login a user
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/login`, credentials);
    localStorage.setItem("token", response.data.token);
    dispatch(
      loginSuccess({
        user: response.data.user,
        token: response.data.token,
      })
    );
  } catch (error) {
    dispatch(
      setError(error.response ? error.response.data.error : error.message)
    );
  }
};

export default userSlice.reducer;
