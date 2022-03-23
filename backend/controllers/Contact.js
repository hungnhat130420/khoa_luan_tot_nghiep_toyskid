const Contact = require("../models/Contact");
const User = require("../models/User");
require("dotenv").config();
const nodemailer = require("nodemailer");
const sendMailFeedback = async (req, res, next) => {
  try {
    const { userID, content } = req.body;
    const foundUser = await User.findOne({ _id: req.userID });
    if (!foundUser)
      return res
        .status(403)
        .json({ error: { message: "Người dùng chưa đăng nhập!!!" } });
    if (!userID || !content)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.EMAIL_TOYSKID,
      subject:
        "Feedback from " +
        `${foundUser.userName}` +
        "(ID: " +
        `${foundUser._id}` +
        ")" +
        " to Toyskid",
      html: `${content}`,
    });
    const newContact = new Contact({
      userID,
      content,
    });
    newContact.save();
    return res.status(200).json({
      Status: "success",
      message: "Gửi phản hồi thành công!!!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { sendMailFeedback };
