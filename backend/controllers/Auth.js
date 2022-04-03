const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID;
const twilioClient = require("twilio")(accountSid, authToken);
const nodemailer = require("nodemailer");
let rfToken = [];
const signUpByEmail = async (req, res, next) => {
  try {
    const { fullName, userName, email, password } = req.body;
    if (!fullName || !userName || !email || !password)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const foundEmail = await User.findOne({ email });
    if (foundEmail)
      return res
        .status(400)
        .json({ error: { message: "Email đã được sử dụng!" } });
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({
      success: true,
      message: "Create User By Email Success!!!",
    });
  } catch (error) {
    next(error);
  }
};
const signUpByPhone = async (req, res, next) => {
  try {
    const { fullName, userName, phone, password } = req.body;
    if (!fullName || !userName || !phone || !password)
      return res
        .status(400)
        .json({ error: { message: "Chưa điền đầy đủ thông tin!" } });
    const foundPhone = await User.findOne({ phone });
    if (foundPhone)
      return res
        .status(400)
        .json({ error: { message: "Số điện thoại đã được sử dụng!" } });
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      fullName,
      userName,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({
      success: true,
      message: "Create User By Phone Success!!!",
    });
  } catch (error) {
    next(error);
  }
};

const signInByPhone = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res
        .status(400)
        .json({ error: { message: "Chưa nhập đầy đủ thông tin!!!" } });
    const foundPhone = await User.findOne({ phone });
    if (!foundPhone)
      return res
        .status(400)
        .json({ error: { message: "Số điện thoại không chính xác!!!" } });
    const validPassword = await argon2.verify(foundPhone.password, password);
    if (!validPassword)
      return res
        .status(400)
        .json({ error: { message: "Password không chính xác!!!" } });
    const accessToken = jwt.sign(
      { userID: foundPhone._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );
    const refreshToken = jwt.sign(
      { userID: foundPhone._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    rfToken.push(refreshToken);
    const user = await User.findOne({ phone });
    return res.json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const signInByEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: { message: "Chưa nhập đầy đủ thông tin!!!" } });
    const foundEmail = await User.findOne({ email });
    if (!foundEmail)
      return res
        .status(400)
        .json({ error: { message: "Email không chính xác!!!" } });
    const validPassword = await argon2.verify(foundEmail.password, password);
    if (!validPassword)
      return res
        .status(400)
        .json({ error: { message: "Password không chính xác!!!" } });
    const accessToken = jwt.sign(
      { userID: foundEmail._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );
    const refreshToken = jwt.sign(
      { userID: foundEmail._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    rfToken.push(refreshToken);
    const user = await User.findOne({ email });
    console.log("success");
    return res.json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const sendOTPPhone = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const sendOTP = await twilioClient.verify
      .services(serviceId)
      .verifications.create({
        to: `+84${phone}`,
        channel: "sms",
      });
    if (sendOTP) {
      return res.status(200).json({
        Status: "success",
        message: "Gửi mã OTP thành công!!!",
      });
    } else {
      return res.json({
        Status: "fail",
        message: "Gửi mã OTP không thành công!!!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const verifyOTPPhone = async (req, res, next) => {
  try {
    const { phone, code } = req.body;
    const verifyOTP = await twilioClient.verify
      .services(serviceId)
      .verificationChecks.create({
        to: `+84${phone}`,
        code: code,
      });
    if (verifyOTP.valid) {
      return res.status(200).json({
        Status: "success",
        message: "Mã OTP chính xác!!!",
      });
    } else {
      return res.json({
        Status: "fail",
        message: "Mã OTP chưa chính xác!!!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const sendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const link = "https://www.facebook.com/";
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
      to: `${email}`,
      subject: "Web Toyskid Send OTP",
      html:
        "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
        link +
        ">Click here to verify</a>",
    });
    return res.status(200).json({
      Status: "success",
      message: "Mã xác nhận thành công!!!",
    });
  } catch (error) {
    next(error);
  }
};
const refreshToken = async (req, res, next) => {
  try {
    const { refreshTK } = req.body;
    if (!refreshTK) return res.sendStatus(401);
    if (!rfToken.includes(refreshTK)) return res.sendStatus(403);
    jwt.verify(refreshTK, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { userID: data._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3600s" }
      );
      return res.status(200).json(accessToken);
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    rfToken = rfToken.filter((refTK) => refTK !== refreshToken);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const checkPhone = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const foundPhone = await User.findOne({ phone });
    if (foundPhone) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};
const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundEmail = await User.findOne({ email });
    if (foundEmail) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { phone, email, oldPassword, newPassword } = req.body;
    if (phone || !email || !oldPassword || !newPassword) {
      const foundUser = await User.findOne({ phone: phone });
      if (!foundUser)
        return res
          .status(403)
          .json({ error: { message: "Không tìm thấy Email!!!" } });
      const validPassword = await argon2.verify(
        foundUser.password,
        oldPassword
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ error: { message: "Password không chính xác!!!" } });
      const hashedNewPassword = await argon2.hash(newPassword);
      foundUser.password = hashedNewPassword;
      await foundUser.save();
    }
    if (!phone || email || !oldPassword || !newPassword) {
      const foundUser = await User.findOne({ email: email });
      if (!foundUser)
        return res
          .status(403)
          .json({ error: { message: "Không tìm thấy số điện thoại!!!" } });
      const validPassword = await argon2.verify(
        foundUser.password,
        oldPassword
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ error: { message: "Password không chính xác!!!" } });
      const hashedNewPassword = await argon2.hash(newPassword);
      foundUser.password = hashedNewPassword;
      await foundUser.save();
    }
    return res.status(200).json({
      Status: "success",
      message: "Đổi mật khẩu thành công!!!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpByEmail,
  signUpByPhone,
  signInByPhone,
  signInByEmail,
  sendOTPPhone,
  verifyOTPPhone,
  sendVerifyEmail,
  refreshToken,
  logout,
  checkPhone,
  checkEmail,
  forgetPassword,
};
