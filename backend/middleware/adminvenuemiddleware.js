const Venue = require("../model/Venue.js");

const venueAdminMiddleware = async (req, res, next) => {
    try {

        // User must be logged in
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // Super admin can edit any venue
        if (req.user.role === "super_admin") {
            return next();
        }

        // Normal users cannot edit
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        // Get the venue being updated
        const venue = await Venue.findById(req.params.id);

        if (!venue) {
            return res.status(404).json({
                message: "Venue not found",
            });
        }

        // Check whether this admin owns the venue
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