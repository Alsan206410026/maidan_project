const Venue = require("../model/Venue.js");

const venueAdminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // Allow Super Admin immediately
        if (req.user.role === "super_admin") {
            return next();
        }

        // Only admins continue
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        const venue = await Venue.findOne({ admin: req.user._id });

        if (!venue) {
            return res.status(404).json({
                message: "Venue not found",
            });
        }

        req.venue = venue;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    venueAdminMiddleware,
};