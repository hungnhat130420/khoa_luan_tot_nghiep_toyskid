const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    nation: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
