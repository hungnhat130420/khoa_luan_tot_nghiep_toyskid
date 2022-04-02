const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");
const AddCart = async (req, res, next) => {
  try {
    const { productID, quantity } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (!productID || !quantity)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const newCart = new Cart({
      productID,
      userID: foundUser._id,
      quantity,
    });
    const result = await newCart.save();
    return res.json({
      success: true,
      message: "Add New Cart Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateCart = async (req, res, next) => {
  try {
    const cartID = req.params.cartID;
    const newCart = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Cart.findByIdAndUpdate(cartID, newCart);
    return res.json({
      success: true,
      message: "Update Cart Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const DeleteCart = async (req, res, next) => {
  try {
    const cartID = req.params.cartID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Cart.deleteOne({ _id: cartID });
    return res.json({
      success: true,
      message: "Delete Cart Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const FindCartByName = async (req, res, next) => {
  try {
    const { productName } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const foundProduct = await Product.findOne({ productName });
    if (!foundProduct)
      return res
        .status(403)
        .json({ error: { message: "Không tìm thấy sản phẩm!!!" } });
    const productID = foundProduct._id;
    const result = await Cart.find({ productID });
    return res.json({
      success: true,
      message: "Find Cart Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const GetAllCart = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Cart.find({});
    return res.json({
      success: true,
      message: "Get All Cart Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddCart,
  UpdateCart,
  DeleteCart,
  FindCartByName,
  GetAllCart,
};
