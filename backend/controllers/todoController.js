const Todo = require("../model/todoSchema");
const User = require("../model/userSchema");
const { validationResult } = require("express-validator");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getUsers = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user.id });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { inputData, completed } = req.body;

  try {
    const newTodo = new Todo({
      inputData,
      completed,
      user: req.user.id,
    });

    const todo = await newTodo.save();

    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update a todo
const updateTodo = async (req, res) => {
  const { inputData, completed } = req.body;
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { inputData, completed },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a todo
const deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: "Todo removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getUsers,
};
