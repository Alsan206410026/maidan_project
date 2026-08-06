const Booking = require("../model/Booking");
const Conversation = require("../model/Conversation");
const User = require("../model/User");
const Venue = require("../model/Venue");

const getUsersForSidebar = async (req, res) => {
  try {
    const adminId = req.user._id;

 
    // Find venues owned by this admin
   

    const venues = await Venue.find({ admin: adminId }).select("_id");

    const venueIds = venues.map((venue) => venue._id);

   
    // Find users who booked these venues
 

    const bookings = await Booking.find({
      venue: { $in: venueIds },
    }).populate("user", "fullName email");

    // Store unique users
    const usersMap = new Map();

    bookings.forEach((booking) => {
      if (booking.user) {
        usersMap.set(
          booking.user._id.toString(),
          booking.user
        );
      }
    });

  
    // Find conversations involving this admin


    const conversations = await Conversation.find({
      participants: adminId,
    }).populate("participants", "fullName email role");

    conversations.forEach((conversation) => {
      conversation.participants.forEach((participant) => {
        if (
          participant.role === "user" &&
          participant._id.toString() !== adminId.toString()
        ) {
          usersMap.set(
            participant._id.toString(),
            participant
          );
        }
      });
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: [...usersMap.values()],
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsersForSidebar,
};