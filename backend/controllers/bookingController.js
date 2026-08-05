const Booking = require("../model/Booking");
const TimeSlot = require("../model/TimeSlot");
const Venue = require("../model/Venue");
const User = require("../model/User");
const sendEmail = require("../utils/sendEmail");

// create booking
const createBooking = async (req, res) => {
  try {
    const venueId = req.body.venueId || req.body.venue;
    const slotId = req.body.slotId || req.body.slot;
    const { bookingDate, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!venueId || !slotId || !bookingDate || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Please provide venueId, slotId, bookingDate, and paymentMethod.",
      });
    }

    // 1. Verify venue exists
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    // 2. Verify time slot exists and is active
    const timeSlot = await TimeSlot.findOne({
      _id: slotId,
      venue: venueId,
      status: "Active",
    });

    if (!timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Selected time slot is invalid or currently inactive.",
      });
    }

    // 3. Check for existing booking conflicts
    const existingBooking = await Booking.findOne({
      venue: venueId,
      slot: slotId,
      bookingDate,
      bookingStatus: { $in: ["Booked", "Paid"] },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked for the selected date.",
      });
    }

    // 4. Initial status determination
    const bookingStatus = paymentMethod === "Cash" ? "Booked" : "Pending";

    // 5. Create booking using server-side venue price
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
      .populate("user", "name email phone");

    // 6. Send Email Notification
    if (populatedBooking.user && populatedBooking.user.email) {
      const emailSubject =
        paymentMethod === "Cash"
          ? `Booking Confirmed for ${populatedBooking.venue.name}`
          : `Booking Initiated for ${populatedBooking.venue.name}`;

      const emailText =
        `Hello ${populatedBooking.user.name},\n\n` +
        `Your booking request at ${populatedBooking.venue.name} has been processed.\n` +
        `Date: ${bookingDate}\n` +
        `Time Slot: ${populatedBooking.slot.startTime} - ${populatedBooking.slot.endTime}\n` +
        `Total Amount: NRs. ${populatedBooking.totalAmount}\n` +
        `Payment Method: ${paymentMethod}\n` +
        `Booking Status: ${bookingStatus}\n\n` +
        `Thank you for using our system!`;

      await sendEmail({
        email: populatedBooking.user.email,
        subject: emailSubject,
        message: emailText,
      }).catch((err) => console.error("Email send failed:", err.message));
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

// get all bookings (scoped by user role for data visibility)
const getAllBookings = async (req, res) => {
  try {
    let query = {};

    // Filter database scope based on who is asking
    if (req.user.role === "venueAdmin" || req.isVenueAdmin) {
      const managedVenues = await Venue.find({ admin: req.user._id }).select("_id");
      const venueIds = managedVenues.map((v) => v._id);
      query = { venue: { $in: venueIds } };
    } else if (req.user.role !== "superadmin" && req.user.role !== "admin") {
      query = { user: req.user._id };
    }

    const bookings = await Booking.find(query)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

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

// get booking by id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("venue", "name location images price admin")
      .populate("slot", "startTime endTime")
      .populate("user", "name email phone");

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

// search bookings
const searchBookings = async (req, res) => {
  try {
    const { date, bookingStatus, paymentStatus, venueId } = req.query;
    let query = {};

    if (req.user.role === "venueAdmin" || req.isVenueAdmin) {
      const managedVenues = await Venue.find({ admin: req.user._id }).select("_id");
      const venueIds = managedVenues.map((v) => v._id);
      query.venue = { $in: venueIds };
    } else if (req.user.role !== "superadmin" && req.user.role !== "admin") {
      query.user = req.user._id;
    }

    if (date) query.bookingDate = date;
    if (bookingStatus) query.bookingStatus = bookingStatus;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (venueId && (req.user.role === "superadmin" || req.user.role === "admin")) {
      query.venue = venueId;
    }

    const bookings = await Booking.find(query)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "name email phone")
      .sort({ bookingDate: -1 });

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

// update booking
const updateBooking = async (req, res) => {
  try {
    const { slotId, bookingDate, bookingStatus, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const targetSlot = slotId || booking.slot;
    const targetDate = bookingDate || booking.bookingDate;

    if (slotId || bookingDate) {
      const conflictBooking = await Booking.findOne({
        _id: { $ne: booking._id },
        venue: booking.venue,
        slot: targetSlot,
        bookingDate: targetDate,
        bookingStatus: { $in: ["Booked", "Paid"] },
      });

      if (conflictBooking) {
        return res.status(400).json({
          success: false,
          message: "The new slot is already booked for that date.",
        });
      }

      booking.slot = targetSlot;
      booking.bookingDate = targetDate;
    }

    const oldBookingStatus = booking.bookingStatus;
    const oldPaymentStatus = booking.paymentStatus;

    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "name email phone");

    if (updatedBooking.user && updatedBooking.user.email) {
      if (bookingStatus === "Cancelled" && oldBookingStatus !== "Cancelled") {
        await sendEmail({
          email: updatedBooking.user.email,
          subject: `Booking Cancelled - ${updatedBooking.venue.name}`,
          message: `Hello ${updatedBooking.user.name},\n\nYour booking at ${updatedBooking.venue.name} for ${updatedBooking.bookingDate} (${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}) has been cancelled.\n\nIf you have any questions, please contact venue support.`,
        }).catch((err) => console.error("Email send failed:", err.message));
      }

      if (
        (bookingStatus === "Booked" || bookingStatus === "Paid" || paymentStatus === "Paid") &&
        (oldBookingStatus !== bookingStatus || oldPaymentStatus !== paymentStatus)
      ) {
        await sendEmail({
          email: updatedBooking.user.email,
          subject: `Your futsal ground has been booked! - ${updatedBooking.venue.name}`,
          message: `Hello ${updatedBooking.user.name},\n\nGreat news! Your futsal booking at ${updatedBooking.venue.name} is confirmed and marked as ${bookingStatus}.\n\nDate: ${updatedBooking.bookingDate}\nTime: ${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}\nPayment Status: ${updatedBooking.paymentStatus}\n\nSee you on the ground!`,
        }).catch((err) => console.error("Email send failed:", err.message));
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

// delete booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("venue", "name")
      .populate("slot", "startTime endTime")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.user && booking.user.email) {
      await sendEmail({
        email: booking.user.email,
        subject: `Booking Cancelled - ${booking.venue ? booking.venue.name : "Venue"}`,
        message: `Hello ${booking.user.name},\n\nYour booking for ${booking.bookingDate} has been deleted and cancelled.\n\nThe time slot is now available for other users.`,
      }).catch((err) => console.error("Email send failed:", err.message));
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
  updateBooking,
  deleteBooking,
  searchBookings,
};