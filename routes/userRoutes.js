const express = require("express");
const fs = require("fs");
const AppError = require("../utilits/AppError");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/user");
const {
  signUp,
  getSingleUser,
  login,
  getAllUsers,
} = require("../Controllers/AuthenticationControllers");
const {
  signUpSchema,
  loginSchema,
  loginvalidation,
  signUpvalidation,
} = require("../utilits/authenticaionSchema");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", signUpvalidation, signUp);

router.post(
  "/login",
  loginvalidation,
  /* ()=>{}    //we can write many of middlewares */
  login
);

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  // update user with id
  res.send("user updated");
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  // del user with id
  res.send("user deleted");
});

module.exports = router;
