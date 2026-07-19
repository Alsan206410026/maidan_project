const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        next();
    } else {
        return res.status(403).json({
            message: "Not authorized",
        });
    }
};

module.exports = { superAdmin };