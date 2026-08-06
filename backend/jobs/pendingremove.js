const Booking = require("../model/Booking");

const pendingRemove = async () => {
  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

    const result = await Booking.updateMany(
      {
        paymentMethod: "eSewa",
        bookingStatus: "Pending",
        createdAt: { $lte: threeMinutesAgo },
      },
      {
        $set: {
          bookingStatus: "Cancelled",
        },
      }
    );

    console.log(
      `${result.modifiedCount} expired pending eSewa booking(s) cancelled.`
    );
  } catch (error) {
    console.error("Pending cleanup failed:", error.message);
  }
};

module.exports = pendingRemove;