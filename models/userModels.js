const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "seller"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
