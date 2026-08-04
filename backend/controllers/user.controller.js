const Venue = require("../model/Venue");

const getAdminsForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const venues = await Venue.find()
      .populate({
        path: "admin",
        match: {
          _id: { $ne: loggedInUserId },
          role: "admin",
        },
        select: "fullName email",
      });

    // Remove venues where no matching admin exists
    const filteredVenues = venues.filter((venue) => venue.admin);

    return res.status(200).json({
      message: "Venue admins retrieved successfully",
      data: filteredVenues,
    });
  } catch (error) {
    console.error("Error retrieving venue admins:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAdminsForSidebar,
};