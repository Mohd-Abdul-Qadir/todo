import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    fetchTodosSuccess: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    addTodoSuccess: (state, action) => {
      state.items.push(action.payload);
    },
    updateTodoSuccess: (state, action) => {
      const index = state.items.findIndex(
        (todo) => todo._id === action.payload._id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTodoSuccess: (state, action) => {
      state.items = state.items.filter((todo) => todo._id !== action.payload);
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosSuccess,
  addTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess,
  fetchUserSuccess,
  setError,
} = todoSlice.actions;

export const fetchTodos = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/data`, {
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    });
    dispatch(fetchTodosSuccess(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Fetch user data
export const fetchUser = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/get-user`, {
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    });
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Add a new todo
export const addTodo = (newTodo, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/add`, newTodo, {
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    });
    dispatch(addTodoSuccess(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Update a todo
export const updateTodo = (id, updatedTodo, token) => async (dispatch) => {
  try {
    const response = await axios.put(`${url}/update/${id}`, updatedTodo, {
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    });
    dispatch(updateTodoSuccess(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Delete a todo
export const deleteTodo = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`${url}/delete/${id}`, {
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    });
    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default todoSlice.reducer;
