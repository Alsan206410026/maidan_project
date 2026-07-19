const superAdminOrAdmin = (req, res, next) => {
  if (req.user && ["admin", "super_admin"].includes(req.user.role)) {
    return next();
  }

  return res.status(403).json({
    message: "Not authorized",
  });
};

module.exports = { superAdminOrAdmin };