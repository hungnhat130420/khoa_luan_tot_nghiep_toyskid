const express = require("express");
const router = express.Router();
const OrderDetailController = require("../controllers/OrderDetail");
const verifyToken = require("../middleware/auth");
router.post("/addorderdetail",verifyToken.verifyToken,OrderDetailController.AddOrderDetail);
router.put("/updateorderdetail/:orderDetailID",verifyToken.verifyToken,OrderDetailController.UpdateOrderDetail);
module.exports = router;