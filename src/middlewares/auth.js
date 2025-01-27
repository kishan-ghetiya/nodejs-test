const { verifyToken } = require('../config/auth'); // Import verifyToken from auth.js
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token not provided in header" });
  }

  // Use the verifyToken function from auth.js to verify the token
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // Attach the decoded user to the request object
  req.user = decoded;
  next();
};

module.exports = authMiddleware;
