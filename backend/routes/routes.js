const express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getUsers,
} = require("../controllers/todoController");

const { createUser, loginUser } = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/data", verifyToken, getTodos);
router.get("/get-user", verifyToken, getUsers);
router.post("/add", verifyToken, addTodo);
router.put("/update/:id", verifyToken, updateTodo);
router.delete("/delete/:id", verifyToken, deleteTodo);

router.post("/create", jsonParser, createUser);
router.post("/login", jsonParser, loginUser);

module.exports = router;
