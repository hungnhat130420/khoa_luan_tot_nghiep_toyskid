const Order = require("../models/Order");
const User = require("../models/User");
const OrderDetail = require("../models/OrderDetail");
const AddOrder = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (
      foundUser.address == "" ||
      foundUser.phone == "" ||
      foundUser.email == ""
    )
      return res
        .status(403)
        .json({
          error: { message: "Người dùng chưa cập nhật đầy đủ thông tin!!!" },
        });
    const newOrder = new Order({
      userName: foundUser.userName,
      userPhone: foundUser.phone,
      userAddress: foundUser.address,
      userID: foundUser._id,
    });
    const result = await newOrder.save();
    return res.json({
      success: true,
      message: "Add New Order Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateOrderShipDate = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const { dateShipped } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Order.findByIdAndUpdate(orderID, { dateShipped: dateShipped });
    return res.json({
      success: true,
      message: "Update Order Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const UpdateOrderTotalMoney = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await OrderDetail.find({ orderID: orderID });
    console.log(result);
    let totalmn = 0;
    for (let i = 0; i < result.length; i++) {
      totalmn = totalmn + result[i].totalMoney;
      console.log(result[i].totalMoney);
    }

    await Order.findByIdAndUpdate(orderID, { totalMoney: totalmn });
    return res.json({
      success: true,
      message: "Update Order Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const UpdateOrderStatus = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const { orderStatus } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Order.findByIdAndUpdate(orderID, { orderStatus: orderStatus });
    return res.json({
      success: true,
      message: "Update Order Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const DeleteOrder = async (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Order.deleteOne({ _id: orderID });
    await OrderDetail.deleteMany({ orderID: orderID });
    return res.json({
      success: true,
      message: "Delete Order Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddOrder,
  UpdateOrderShipDate,
  UpdateOrderTotalMoney,
  UpdateOrderStatus,
  DeleteOrder,
};
