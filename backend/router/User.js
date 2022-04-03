const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const verifyToken = require("../middleware/auth");
router.put("/updateuser/:userID",verifyToken.verifyToken,UserController.UpdateUser);
router.post("/changepassword",verifyToken.verifyToken,UserController.changePassword);
module.exports = router;

