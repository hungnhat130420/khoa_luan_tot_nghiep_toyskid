const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/Contact");
const verifyToken = require("../middleware/auth");
router.post("/addnewcontact",verifyToken.verifyToken,ContactController.sendMailFeedback);
module.exports = router;