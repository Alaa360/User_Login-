const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const User = require("./user")
//const { string, required } = require("joi");

/* const todoSchema = new Schema({
  title: {
    type: string,
    required: true,
  },
  status: {
    type: string,
    enum: ["todo", "doing", "done"],
    default: "todo", //the default gives up the required property as it always has value as a default
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}); */

const todoSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo", //the default gives up the required property as it always has value as a default
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  });

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
