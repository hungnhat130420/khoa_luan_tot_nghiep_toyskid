const express = require("express");
const router = express.Router();
const auth = require("./Auth");
const user = require("./User");
const category = require("./Category");
const brand = require("./Brand");
const product = require("./Product");

router.use("/auth", auth);
router.use("/user", user);
router.use("/category", category);
router.use("/brand", brand);
router.use("/product", product);

module.exports = router;
