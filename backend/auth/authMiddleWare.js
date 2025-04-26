// Authorization middleware. It is used to check if API calls have a valid authorization token.
// This is to protect API endpoints against unauthorized calls.

// Import Node.js module for verifying JWTs (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token and attach user data to request
function authenticateUser(req, res, next) {
  const token =
    req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Middleware to authorize only users with role "editor" (e.g., admins)
function authorizeEditor(req, res, next) {
  if (!req.user || req.user.role !== 'editor') {
    return res
      .status(403)
      .json({ message: 'Access denied. Editor role required.' });
  }
  next();
}

// Export both middleware functions
module.exports = {
  authenticateUser,
  authorizeEditor
};
