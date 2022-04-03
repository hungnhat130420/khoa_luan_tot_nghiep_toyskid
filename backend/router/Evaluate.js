const express = require("express");
const router = express.Router();
const EvaluateController = require("../controllers/Evaluate");
const verifyToken = require("../middleware/auth");
router.put("/changestart/:evaluateID",verifyToken.verifyToken,EvaluateController.ChangeStart);
module.exports = router;