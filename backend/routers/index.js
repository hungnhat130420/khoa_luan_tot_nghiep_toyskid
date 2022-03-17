const express = require("express");
const router = express.Router();
const auth = require("./Auth");
const user = require("./User");
router.use("/auth", auth);
router.use("/user", user);
module.exports = router;
