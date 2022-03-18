const Product = require("../models/Product");
const mongoose = require("mongoose");
const AddProduct = async (req, res, next) => {
  try {
    const productName = req.body.productName;
    const image = req.body.image;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const description = req.body.description;
    const color = req.body.color;
    const categoryID = req.body.categoryID;
    const brandID = req.body.brandID;
    let listColors = [];
    for (let i = 0; i < color.length; i++) {
        listColors.push(mongoose.Types.ObjectId(color[i]));
    }
    if (
      !productName ||
      !image ||
      !quantity ||
      !price ||
      !description ||
      !color ||
      !categoryID ||
      !brandID
    )
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const newProduct = new Product({
      productName,
      image,
      quantity,
      price,
      description,
      listColors,
      categoryID,
      brandID,
    });
    await newProduct.save();
    return res.json({
      success: true,
      message: "Add new Product Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { AddProduct };
