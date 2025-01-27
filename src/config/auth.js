const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Use a secure key in production

// Generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
