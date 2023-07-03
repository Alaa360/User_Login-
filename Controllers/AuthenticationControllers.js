const AppError = require("../utilits/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};


const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required", 400));

  const userCreated = new User({ email, password });
  await userCreated.save();
  res.send(userCreated);
};


const login = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 6);
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("invalid Credentials", 404));
  const isMatch = await user.checkPassword(password);
  if (!isMatch) return next(new AppError("invalid credentials", 404));
  user.password = undefined;
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
  res.send({token,user});
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));
  res.send(user);
};



/* const updateUser = async (req, res, next) => {
  const user = user.findOne({});
  user.email = "";
  user.password = "";
  await user.save();
}; */

module.exports = { signUp, getSingleUser, login, getAllUsers };
