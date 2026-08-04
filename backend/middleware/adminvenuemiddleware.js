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

        const venueId = req.params.id || req.body.venue;

        const venue = await Venue.findById(venueId);

        if (!venue) {
            return res.status(404).json({
                message: "Venue not found",
            });
        }

        if (venue.admin.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not the admin of this venue.",
            });
        }

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