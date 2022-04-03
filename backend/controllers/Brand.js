const Brand = require("../models/Brand");
const User = require("../models/User");

const AddBrand = async (req, res, next) => {
  try {
    const { brandName, nation } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (!brandName || !nation)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const newBrand = new Brand({
      brandName,
      nation,
    });
    const result = await newBrand.save();
    return res.json({
      success: true,
      message: "Add New Brand Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateBrand = async (req, res, next) => {
  try {
    const brandID = req.params.brandID;
    const newBrand = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Brand.findByIdAndUpdate(brandID, newBrand);
    return res.json({
      success: true,
      message: "Update Brand Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const DeleteBrand = async (req, res, next) => {
  try {
    const brandID = req.params.brandID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Brand.deleteOne({ _id: brandID });
    return res.json({
      success: true,
      message: "Delete Brand Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const FindBrandByName = async (req, res, next) => {
  try {
    const { brandName } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Brand.find({ brandName });
    return res.json({
      success: true,
      message: "Find Brand Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const FindBrandByNation = async (req, res, next) => {
  try {
    const { nation } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Brand.find({ nation });
    return res.json({
      success: true,
      message: "Find Brand Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const FindBrandByID = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Brand.findOne({ _id });
    return res.json({
      success: true,
      message: "Find Brand Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const GetAllBrand = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Brand.find({});
    return res.json({
      success: true,
      message: "Get All Brand Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddBrand,
  UpdateBrand,
  DeleteBrand,
  FindBrandByName,
  FindBrandByNation,
  FindBrandByID,
  GetAllBrand,
};
