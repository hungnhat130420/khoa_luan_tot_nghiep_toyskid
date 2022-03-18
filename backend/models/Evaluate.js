const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluateSchema = new Schema(
  {
    oneStar: {
      type: Number,
    },
    twoStar: {
      type: Number,
    },
    threeStar: {
      type: Number,
    },
    fourStar: {
      type: Number,
    },
    fiveStar: {
      type: Number,
    },
    avgEvaluate: {
      type: mongoose.Schema.Types.Float,
    },
    totalCount: {
      type: Number,
    },
    productID: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Evaluate = mongoose.model("Evaluate", EvaluateSchema);
module.exports = Evaluate;
