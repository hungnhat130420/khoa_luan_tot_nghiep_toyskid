const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/Order");
const verifyToken = require("../middleware/auth");
router.post("/addorder",verifyToken.verifyToken,OrderController.AddOrder);
router.put("/updateordershipdate/:orderID",verifyToken.verifyToken,OrderController.UpdateOrderShipDate);
router.put("/updateordertotalmoney/:orderID",verifyToken.verifyToken,OrderController.UpdateOrderTotalMoney);
router.put("/updateorderstatus/:orderID",verifyToken.verifyToken,OrderController.UpdateOrderStatus);
router.delete("/deleteorder/:orderID",verifyToken.verifyToken,OrderController.DeleteOrder);
module.exports = router;