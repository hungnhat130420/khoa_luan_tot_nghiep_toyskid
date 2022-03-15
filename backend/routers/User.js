const express = require("express");
const router = express.Router();

router.get("/getUser", (req, res) => {
  res.send("Get User");
});

module.exports = router;
