const Product = require("../models/Product");
const User = require("../models/User");
const Evaluate = require("../models/Evaluate");
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
    if (
      !productName ||
      !image ||
      !quantity ||
      !price ||
      !description ||
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
      color,
      categoryID,
      brandID,
    });
    const result = await newProduct.save();
    const newEvaluate = new Evaluate({productID: result._id});
    await newEvaluate.save();
    return res.json({
      success: true,
      message: "Add new Product Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const UpdateProduct = async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const newProduct = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Product.findByIdAndUpdate(productID, newProduct);
    return res.json({
      success: true,
      message: "Update Product Success!!!",
    });
  } catch (error) {
    next(error);
  }
};
const DeleteProduct = async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Product.deleteOne({ _id: productID });
    await Evaluate.deleteOne({ productID: productID });
    return res.json({
      success: true,
      message: "Delete Product Success!!!",
    });
  } catch (error) {
    next(error);
  }
};
const FindProductByName = async (req, res, next) => {
  try {
    const { productName } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Product.find({ productName });
    return res.json({
      success: true,
      message: "Find Product Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const FindProductByID = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Product.findOne({ _id });
    return res.json({
      success: true,
      message: "Find Product Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const FindProductByCategoryID = async (req, res, next) => {
  try {
    const { categoryID } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Product.find({ categoryID });
    return res.json({
      success: true,
      message: "Find Product Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const FindProductByBrandID = async (req, res, next) => {
  try {
    const { brandID } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Product.find({ brandID });
    return res.json({
      success: true,
      message: "Find Product Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const GetAllProduct = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Product.find({});
    return res.json({
      success: true,
      message: "Get All Product Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  FindProductByName,
  FindProductByID,
  FindProductByCategoryID,
  FindProductByBrandID,
  GetAllProduct,
};
