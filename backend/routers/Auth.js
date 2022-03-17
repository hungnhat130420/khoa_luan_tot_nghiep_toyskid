const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth");
const verifyToken = require("../middleware/auth");
router.post("/signupbyemail", AuthController.signUpByEmail);
router.post("/signupbyphone", AuthController.signUpByPhone);
router.post("/signinbyphone", AuthController.signInByPhone);
router.post("/signinbyemail", AuthController.signInByEmail);
router.post("/sendotpphone", AuthController.sendOTPPhone);
router.post("/verifyotpphone", AuthController.verifyOTPPhone);
router.post("/sendverifyemail", AuthController.sendVerifyEmail);
router.post("/refreshToken", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.post("/checkphone", AuthController.checkPhone);
router.post("/checkemail", AuthController.checkEmail);
router.post(
  "/changepassword",
  verifyToken.verifyToken,
  AuthController.changePassword
);
module.exports = router;
