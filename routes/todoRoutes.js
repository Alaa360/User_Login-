const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AppError = require("../utilits/AppError");
const verifyToken = require("../utilits/verifyToken");
const Todo = require("../models/todo");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const todos = await Todo.find().populate('user');
  res.send({ todos });
});

router.post("/", verifyToken, async (req, res) => {
  const { title } = req.body;
  const todoCreated = new Todo({ title, user: req.user._id });
  await todoCreated.save();
  res.send(todoCreated);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  // update todo with id
  res.send("todo updated");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // del todo with id
  res.send("todo deleted");
});

module.exports = router;
