const Comment = require("../models/Comment");
const User = require("../models/User");

const AddComment = async (req, res, next) => {
  try {
    const { content, userID, productID } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (!content || !userID || !productID)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const newComment = new Comment({
      content,
      userID,
      productID,
    });
    const result = await newComment.save();
    return res.json({
      success: true,
      message: "Add New Comment Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateComment = async (req, res, next) => {
  try {
    const commentID = req.params.commentID;
    const newComment = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Comment.findByIdAndUpdate(commentID, newComment);
    return res.json({
      success: true,
      message: "Update Comment Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const DeleteComment = async (req, res, next) => {
  try {
    const commentID = req.params.commentID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await Comment.deleteOne({ _id: commentID });
    return res.json({
      success: true,
      message: "Delete Comment Success!!!",
    });
  } catch (error) {
    next(error);
  }
};
const GetAllComment = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const result = await Comment.find({});
    return res.json({
      success: true,
      message: "Get All Comment Success!!!",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const ChangeVote = async (req, res, next) => {
  try {
    const commentID = req.params.commentID;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const foundComment = await Comment.findOne({ commentID });
    if (!foundComment)
      return res
        .status(403)
        .json({ error: { message: "Không tìm thấy bình luận!!!" } });
    const vote = foundComment.vote;
    if (vote.includes(foundUser._id)) {
      vote.remove(foundUser._id);
    } else {
      vote.push(foundUser._id);
    }
    await Comment.findByIdAndUpdate(commentID, {
      vote: vote,
    });
    return res.json({
      success: true,
      message: "Change Comment Success!!!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  AddComment,
  UpdateComment,
  DeleteComment,
  GetAllComment,
  ChangeVote,
};
