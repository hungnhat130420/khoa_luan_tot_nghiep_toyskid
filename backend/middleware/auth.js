const jwt = require('jsonwebtoken');
require("dotenv").config();
const verifyToken = (req, res) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) 
     return res.status(401).json({ success:false, message: 'Access Token Not Found!!!'});

     try {
         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
         req.userID = decoded.userID;
         next();
     } catch (error) {
         log.error(error);
         return res.status(403).json({ success:false, message:"Invalid Token!!!"});
     }
}

module.exports = {verifyToken};