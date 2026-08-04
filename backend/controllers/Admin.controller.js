const User = require("../model/User");

const getSuperAdminsForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({
      _id: { $ne: loggedInUserId },
      role: "super_admin",
    }).select("-password");

    return res.status(200).json({
      message: "Super Admins retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error retrieving super admins:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving super admins.",
    });
  }
};

module.exports = {
  getSuperAdminsForSidebar,
};