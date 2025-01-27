const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized: User role not found" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access forbidden for role: ${req.user.role}` });
    }

    next();
  };
};

module.exports = authorizeRole;
