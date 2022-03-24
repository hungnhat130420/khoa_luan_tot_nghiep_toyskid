const OrderDetail = require("../models/OrderDetail");
const User = require("../models/User");
const Product = require("../models/Product");
const AddOrderDetail = async (req, res, next) => {
  try {
    const { quantity, orderID, productID } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (!quantity || !orderID || !productID)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const findProduct = await Product.findOne({ _id: productID });
    if (findProduct.quantity < quantity)
      return res
        .status(403)
        .json({ error: { message: "Số lượng tồn không đủ!!!" } });
    const newOrderDetail = new OrderDetail({
      quantity,
      uniCost: findProduct.price,
      totalMoney: quantity * findProduct.price,
      orderID,
      productID,
    });
    const result = await newOrderDetail.save();
    await Product.findByIdAndUpdate(productID, {
      quantity: findProduct.quantity - quantity,
    });
    return res.json({
      success: true,
      message: "Add New Order Detail Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateOrderDetail = async (req, res, next) => {
  try {
    const orderDetailID = req.params.orderDetailID;
    const { quantity } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const findOrderDetail = await OrderDetail.findOne({ _id: orderDetailID });
    const productID = findOrderDetail.productID;
    const findProduct = await Product.findOne({ _id: productID });
    if (findProduct.quantity < quantity)
      return res
        .status(403)
        .json({ error: { message: "Số lượng tồn không đủ!!!" } });
    if (findProduct.quantity - quantity == 2 * findProduct.quantity) {
      await OrderDetail.deleteOne({ _id: orderDetailID });
      await Product.findByIdAndUpdate(productID, {
        quantity: findProduct.quantity - quantity,
      });
      return res.json({
        success: true,
        message: "Update Order Detail Success!!!",
      });
    } else {
      await OrderDetail.findByIdAndUpdate(orderDetailID, {
        quantity: findOrderDetail.quantity + quantity,
        totalMoney: (findOrderDetail.quantity + quantity) * findProduct.price,
      });
    }
    await Product.findByIdAndUpdate(productID, {
      quantity: findProduct.quantity - quantity,
    });
    return res.json({
      success: true,
      message: "Update Order Detail Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const GetAllOrderDetail = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await OrderDetail.find({});
    return res.json({
      success: true,
      message: "Get All Order Detail Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddOrderDetail,
  UpdateOrderDetail,
  GetAllOrderDetail,
};
