const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
const ContactSchema = new Schema(
  {
    userID: {
      type: String,
      ref: "User",
    },
    content: {
      type: String,
    },
    timeSend: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
