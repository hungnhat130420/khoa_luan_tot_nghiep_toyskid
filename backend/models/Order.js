const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userName: {
      type: String,
    },
    userPhone: {
      type: String,
    },
    userAddress: {
      type: String,
    },
    dateCreated: {
      type: Date,
    },
    dateShipped: {
      type: Date,
    },
    totalMoney: {
      type: mongoose.Schema.Types.Float,
    },
    orderStatus: [
      {
        type: String,
      },
    ],
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
