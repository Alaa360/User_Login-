const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function () {
  const currentDoc = this;
  if (currentDoc.isModified("password")) {
    const hashedPassword = await bcrypt.hash(currentDoc.password, 6);
    currentDoc.password = hashedPassword;
  }
});


//initializing the function used in the authncontroller to checkpassword
userSchema.methods.checkPassword = async function (password) {
  const currentDoc = this;
  console.log(currentDoc);
  const isMatch = await bcrypt.compare(password, currentDoc.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
