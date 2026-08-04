const User = require("../model/User");

const getAdminsForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({
      _id: { $ne: loggedInUserId },
      role: "admin",
    }).select("-password");

    return res.status(200).json({
      message: "Admins retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error retrieving admins:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving admins.",
    });
  }
};

module.exports = {
  getAdminsForSidebar,
};