const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/Product");
const verifyToken = require("../middleware/auth");
module.exports = router;