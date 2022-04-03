const User = require("../models/User");
const argon2 = require("argon2");
const UpdateUser = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const newUser = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    await User.findByIdAndUpdate(userID, newUser);
    return res.json({
      success: true,
      message: "Update User Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    const validPassword = await argon2.verify(foundUser.password, oldPassword);
    if (!validPassword)
      return res
        .status(400)
        .json({ error: { message: "Password không chính xác!!!" } });
    const hashedNewPassword = await argon2.hash(newPassword);
    foundUser.password = hashedNewPassword;
    await foundUser.save();
    return res.status(200).json({
      Status: "success",
      message: "Đổi mật khẩu thành công!!!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { UpdateUser, changePassword };
