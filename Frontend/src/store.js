import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userSlice,
  },
});

export default store;
