import React from "react";
import Login from "./user/Login";
import { Routes, Route } from "react-router-dom";
import User from "./user/User";
import "./Item.css";
import "./App.css";
import Todo from "./Todo.jsx/Todo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default App;
