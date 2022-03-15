const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID;
const twilioClient = require("twilio")(accountSid, authToken);
const nodemailer = require("nodemailer");

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
    const accessToken = jwt.sign(
      { userID: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.json({
      success: true,
      message: "Create User By Email Success!!!",
      accessToken,
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
    const accessToken = jwt.sign(
      { userID: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.json({
      success: true,
      message: "Create User By Email Success!!!",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;
    if (!email && phone && password) {
      const foundPhone = await User.findOne({ phone });
      if (!foundPhone)
        return res
          .status(400)
          .json({ error: { message: "Số điện thoại không chính xác!!!" } });
      const validPassword = argon2.verify(foundPhone.password, password);
      if (!validPassword)
        return res
          .status(400)
          .json({ error: { message: "Password không chính xác!!!" } });
      const accessToken = jwt.sign(
        { userID: foundPhone._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        success: true,
        message: "Đăng nhập bằng số điện thoại thành công!!!",
        accessToken,
      });
    } else if (email && !phone && password) {
      const foundEmail = await User.findOne({ email });
      if (!foundEmail)
        return res
          .status(400)
          .json({ error: { message: "Email không chính xác!!!" } });
      const validPassword = argon2.verify(foundEmail.password, password);
      if (!validPassword)
        return res
          .status(400)
          .json({ error: { message: "Password không chính xác!!!" } });
      const accessToken = jwt.sign(
        { userID: foundEmail._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        success: true,
        message: "Đăng nhập bằng Email thành công!!!",
        accessToken,
      });
    }
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



module.exports = {
  signUpByEmail,
  signUpByPhone,
  signIn,
  sendOTPPhone,
  verifyOTPPhone,
  sendVerifyEmail,
};
