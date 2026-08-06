const Booking = require("../model/Booking");
const TimeSlot = require("../model/TimeSlot");
const Venue = require("../model/Venue");
const sendEmail = require("../utils/sendEmail");

// Create Booking

const createBooking = async (req, res) => {
  try {
    const venueId = req.body.venueId || req.body.venue;
    const slotId = req.body.slotId || req.body.slot;
    const { bookingDate, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!venueId || !slotId || !bookingDate || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide venueId, slotId, bookingDate and paymentMethod.",
      });
    }

    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    const timeSlot = await TimeSlot.findOne({
      _id: slotId,
      venue: venueId,
      status: "Active",
    });

    if (!timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Selected time slot is invalid or inactive.",
      });
    }

    const todayStr = new Date().toISOString().split("T")[0];

    if (bookingDate === todayStr) {
      const [endHour, endMinute] = timeSlot.endTime
        .split(":")
        .map(Number);

      const slotEndTime = new Date();

      slotEndTime.setHours(endHour, endMinute, 0, 0);

      if (Date.now() > slotEndTime.getTime()) {
        return res.status(400).json({
          success: false,
          message: "This time slot has already passed.",
        });
      }
    }

    const existingBooking = await Booking.findOne({
      venue: venueId,
      slot: slotId,
      bookingDate,
      bookingStatus: {
        $in: ["Booked", "Paid"],
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This slot is already reserved.",
      });
    }

    const bookingStatus =
      paymentMethod === "Cash" ? "Booked" : "Pending";

    const booking = await Booking.create({
      user: userId,
      venue: venueId,
      slot: slotId,
      bookingDate,
      totalAmount: venue.price || venue.pricePerHour || 0,
      paymentMethod,
      paymentStatus: "Pending",
      bookingStatus,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber");

    if (
      populatedBooking.user &&
      populatedBooking.user.email
    ) {
      const subject =
        paymentMethod === "Cash"
          ? `Booking Confirmed - ${populatedBooking.venue.name}`
          : `Booking Request Received - ${populatedBooking.venue.name}`;

      const message =
        `Hello ${
          populatedBooking.user.fullName || "User"
        },\n\n` +
        `Thank you for booking ${populatedBooking.venue.name}.\n\n` +
        `Booking Date: ${bookingDate}\n` +
        `Time: ${populatedBooking.slot.startTime} - ${populatedBooking.slot.endTime}\n` +
        `Payment Method: ${paymentMethod}\n` +
        `Booking Status: ${bookingStatus}\n` +
        `Amount: NRs. ${populatedBooking.totalAmount}\n\n` +
        `Thank you for choosing Maidan.`;

      await sendEmail(
        populatedBooking.user.email,
        subject,
        message
      ).catch((err) =>
        console.error("Email send failed:", err.message)
      );
    }

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: populatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bookings

const getAllBookings = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "admin" && req.venue) {
      query = {
        venue: req.venue._id,
      };
    } else if (
      req.user.role === "admin" &&
      !req.venue
    ) {
      const managedVenues = await Venue.find({
        admin: req.user._id,
      }).select("_id");

      const venueIds = managedVenues.map(
        (venue) => venue._id
      );

      if (venueIds.length > 0) {
        query = {
          venue: {
            $in: venueIds,
          },
        };
      }
    } else if (req.user.role !== "super_admin") {
      query = {
        user: req.user._id,
      };
    }

    const bookings = await Booking.find(query)
      .populate(
        "venue",
        "name location images price"
      )
      .populate(
        "slot",
        "startTime endTime"
      )
      .populate(
        "user",
        "fullName email phoneNumber"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Booking By ID

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate(
        "venue",
        "name location images price admin"
      )
      .populate(
        "slot",
        "startTime endTime"
      )
      .populate(
        "user",
        "fullName email phoneNumber"
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Bookings

const searchBookings = async (req, res) => {
  try {
    const {
      date,
      bookingStatus,
      paymentStatus,
      venueId,
    } = req.query;

    let query = {};

    if (req.user.role === "admin" && req.venue) {
      query.venue = req.venue._id;
    } else if (
      req.user.role === "admin" &&
      !req.venue
    ) {
      const managedVenues = await Venue.find({
        admin: req.user._id,
      }).select("_id");

      const venueIds = managedVenues.map(
        (venue) => venue._id
      );

      query.venue = {
        $in: venueIds,
      };
    } else if (
      req.user.role !== "super_admin"
    ) {
      query.user = req.user._id;
    }

    if (date) {
      query.bookingDate = date;
    }

    if (bookingStatus) {
      query.bookingStatus = bookingStatus;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (
      venueId &&
      (req.user.role === "super_admin" ||
        req.user.role === "admin")
    ) {
      query.venue = venueId;
    }

    const bookings = await Booking.find(query)
      .populate(
        "venue",
        "name location images price"
      )
      .populate(
        "slot",
        "startTime endTime"
      )
      .populate(
        "user",
        "fullName email phoneNumber"
      )
      .sort({
        bookingDate: -1,
      });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Booking

const updateBooking = async (req, res) => {
  try {
    const {
      slotId,
      bookingDate,
      bookingStatus,
      paymentStatus,
    } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const targetSlot = slotId || booking.slot;
    const targetDate = bookingDate || booking.bookingDate;

    const isActivating =
      (bookingStatus === "Booked" ||
        bookingStatus === "Paid") &&
      booking.bookingStatus !== "Booked" &&
      booking.bookingStatus !== "Paid";

    if (slotId || bookingDate || isActivating) {
      const conflictBooking = await Booking.findOne({
        _id: {
          $ne: booking._id,
        },
        venue: booking.venue,
        slot: targetSlot,
        bookingDate: targetDate,
        bookingStatus: {
          $in: ["Booked", "Paid"],
        },
      });

      if (conflictBooking) {
        return res.status(400).json({
          success: false,
          message:
            "The selected slot is already booked for that date.",
        });
      }

      booking.slot = targetSlot;
      booking.bookingDate = targetDate;
    }

    const oldBookingStatus =
      booking.bookingStatus;

    const oldPaymentStatus =
      booking.paymentStatus;

    if (bookingStatus) {
      booking.bookingStatus = bookingStatus;
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    if (paymentStatus === "Paid") {
      booking.bookingStatus = "Paid";
      booking.paymentStatus = "Paid";
    }

    await booking.save();

    const updatedBooking =
      await Booking.findById(booking._id)
        .populate(
          "venue",
          "name location images price"
        )
        .populate(
          "slot",
          "startTime endTime"
        )
        .populate(
          "user",
          "fullName email phoneNumber"
        );

    if (
      updatedBooking &&
      updatedBooking.user &&
      updatedBooking.user.email
    ) {
            let subject = "";
      let message = "";

      switch (booking.bookingStatus) {
        case "Pending":
          subject = `Booking Request Pending - ${updatedBooking.venue.name}`;
          message =
            `Hello ${updatedBooking.user.fullName},\n\n` +
            `Your booking request is currently pending.\n\n` +
            `Venue: ${updatedBooking.venue.name}\n` +
            `Date: ${updatedBooking.bookingDate}\n` +
            `Time: ${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}\n\n` +
            `We will notify you once the booking is confirmed.\n\n` +
            `Thank you,\nMaidan`;
          break;

        case "Booked":
          subject = `Booking Confirmed - ${updatedBooking.venue.name}`;
          message =
            `Hello ${updatedBooking.user.fullName},\n\n` +
            `Congratulations! Your booking has been confirmed.\n\n` +
            `Venue: ${updatedBooking.venue.name}\n` +
            `Date: ${updatedBooking.bookingDate}\n` +
            `Time: ${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}\n\n` +
            `Please arrive on time.\n\n` +
            `Thank you,\nMaidan`;
          break;

        case "Paid":
          subject = `Payment Received - ${updatedBooking.venue.name}`;
          message =
            `Hello ${updatedBooking.user.fullName},\n\n` +
            `We have successfully received your payment.\n\n` +
            `Venue: ${updatedBooking.venue.name}\n` +
            `Date: ${updatedBooking.bookingDate}\n` +
            `Time: ${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}\n\n` +
            `Your booking is fully confirmed.\n\n` +
            `Thank you,\nMaidan`;
          break;

        case "Completed":
          subject = `Booking Completed - ${updatedBooking.venue.name}`;
          message =
            `Hello ${updatedBooking.user.fullName},\n\n` +
            `Your booking has been marked as completed.\n\n` +
            `Thank you for using Maidan.\n\n` +
            `We hope to see you again soon!`;
          break;

        case "Cancelled":
          subject = `Booking Cancelled - ${updatedBooking.venue.name}`;
          message =
            `Hello ${updatedBooking.user.fullName},\n\n` +
            `Your booking has been cancelled.\n\n` +
            `Venue: ${updatedBooking.venue.name}\n` +
            `Date: ${updatedBooking.bookingDate}\n` +
            `Time: ${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}\n\n` +
            `This time slot is now available for booking.\n\n` +
            `Please make a new booking if you still wish to play.\n\n` +
            `Thank you,\nMaidan`;
          break;
      }

      if (
        subject &&
        message &&
        (oldBookingStatus !== booking.bookingStatus ||
          oldPaymentStatus !== booking.paymentStatus)
      ) {
        try {
          await sendEmail(
            updatedBooking.user.email,
            subject,
            message
          );
        } catch (err) {
          console.error(
            "Email send failed:",
            err.message
          );
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Booking

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("venue", "name")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.user && booking.user.email) {
      const subject = `Booking Deleted - ${
        booking.venue?.name || "Venue"
      }`;

      const message =
        `Hello ${booking.user.fullName},\n\n` +
        `Your booking has been deleted by the venue administrator.\n\n` +
        `Venue: ${booking.venue?.name || "Venue"}\n` +
        `Date: ${booking.bookingDate}\n` +
        `Time: ${booking.slot?.startTime} - ${booking.slot?.endTime}\n\n` +
        `This booking is no longer valid, and the time slot is now available for other users.\n\n` +
        `If you still wish to play, please make a new booking.\n\n` +
        `Thank you,\nMaidan`;

      try {
        await sendEmail(
          booking.user.email,
          subject,
          message
        );
      } catch (err) {
        console.error(
          "Email send failed:",
          err.message
        );
      }
    }

    await booking.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  searchBookings,
  updateBooking,
  deleteBooking,
};