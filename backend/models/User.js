const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      min: 10,
      max: 11,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    address: {
      type: String,
    },
    gender: {
      type: Boolean,
    },
    birthday: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
