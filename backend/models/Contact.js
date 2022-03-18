const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    emailReceive: {
      type: String,
    },
    emailSender: {
      type: String,
    },
    userSender: {
      type: String,
    },
    content: {
      type: String,
    },
    timeSend: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
