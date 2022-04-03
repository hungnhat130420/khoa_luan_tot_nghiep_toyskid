const Category = require("../models/Category");
const User = require("../models/User");
const AddCategory = async (req, res, next) => {
  try {
    const { categoryName, quantity } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (!categoryName || !quantity)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const newCategory = new Category({
      categoryName,
      quantity,
    });
    const result = await newCategory.save();
    return res.json({
      success: true,
      message: "Add New Category Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.categoryID;
    const newCategory = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Category.findByIdAndUpdate(categoryID, newCategory);
    return res.json({
      success: true,
      message: "Update Category Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const DeleteCategory = async (req, res, next) => {
  try {
    const categoryID = req.params.categoryID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Category.deleteOne({ _id: categoryID });
    return res.json({
      success: true,
      message: "Delete Category Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const FindCategoryByName = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Category.find({ categoryName });
    return res.json({
      success: true,
      message: "Find Category Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const FindCategoryByID = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Category.findOne({ _id });
    return res.json({
      success: true,
      message: "Find Category Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const GetAllCategory = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Category.find({});
    return res.json({
      success: true,
      message: "Get All Category Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddCategory,
  UpdateCategory,
  DeleteCategory,
  FindCategoryByName,
  FindCategoryByID,
  GetAllCategory,
};
