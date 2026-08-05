const Booking = require("../model/Booking");
const TimeSlot = require("../model/TimeSlot");
const Venue = require("../model/Venue");
const sendEmail = require("../utils/sendEmail");

// Create booking (Authenticated Users)
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
        message: "Selected time slot is invalid or currently inactive.",
      });
    }

    const todayStr = new Date().toISOString().split("T")[0];
    if (bookingDate === todayStr) {
      const [endHour, endMinute] = timeSlot.endTime.split(":").map(Number);
      const slotEndTime = new Date();
      slotEndTime.setHours(endHour, endMinute, 0, 0);

      if (Date.now() > slotEndTime.getTime()) {
        return res.status(400).json({
          success: false,
          message: "This time slot has already passed for today.",
        });
      }
    }

    const existingBooking = await Booking.findOne({
      venue: venueId,
      slot: slotId,
      bookingDate,
      bookingStatus: { $in: ["Booked", "Paid"] },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This slot is already reserved for the selected date.",
      });
    }

    const bookingStatus = paymentMethod === "Cash" ? "Booked" : "Pending";

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

    if (populatedBooking.user && populatedBooking.user.email) {
      const emailSubject =
        paymentMethod === "Cash"
          ? `Booking Confirmed for ${populatedBooking.venue.name}`
          : `Booking Initiated for ${populatedBooking.venue.name}`;

      const emailText =
        `Hello ${populatedBooking.user.fullName || "User"},\n\n` +
        `Your booking request at ${populatedBooking.venue.name} has been processed.\n` +
        `Date: ${bookingDate}\n` +
        `Time Slot: ${populatedBooking.slot.startTime} - ${populatedBooking.slot.endTime}\n` +
        `Total Amount: NRs. ${populatedBooking.totalAmount}\n` +
        `Payment Method: ${paymentMethod}\n` +
        `Booking Status: ${bookingStatus}\n\n` +
        `Thank you for using our system!`;

      await sendEmail(
        populatedBooking.user.email,
        emailSubject,
        emailText
      ).catch((err) => console.error("Email send failed:", err.message));
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

// Get all bookings (Scoped cleanly via middleware context)
const getAllBookings = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "admin" && req.venue) {
      query = { venue: req.venue._id };
    } else if (req.user.role === "admin" && !req.venue) {
      const managedVenues = await Venue.find({ admin: req.user._id }).select("_id");
      const venueIds = managedVenues.map((v) => v._id);
      if (venueIds.length > 0) {
        query = { venue: { $in: venueIds } };
      }
    } else if (req.user.role !== "super_admin") {
      query = { user: req.user._id };
    }

    const bookings = await Booking.find(query)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
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

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("venue", "name location images price admin")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber");

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

// Search bookings
const searchBookings = async (req, res) => {
  try {
    const { date, bookingStatus, paymentStatus, venueId } = req.query;
    let query = {};

    if (req.user.role === "admin" && req.venue) {
      query.venue = req.venue._id;
    } else if (req.user.role !== "super_admin" && req.user.role !== "admin") {
      query.user = req.user._id;
    }

    if (date) query.bookingDate = date;
    if (bookingStatus) query.bookingStatus = bookingStatus;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (venueId && (req.user.role === "super_admin" || req.user.role === "admin")) {
      query.venue = venueId;
    }

    const bookings = await Booking.find(query)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
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

// Update booking
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

    const isActivating =
      (bookingStatus === "Booked" || bookingStatus === "Paid") &&
      booking.bookingStatus !== "Booked" &&
      booking.bookingStatus !== "Paid";

    if (slotId || bookingDate || isActivating) {
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
          message: "The target slot is already reserved for that date.",
        });
      }

      booking.slot = targetSlot;
      booking.bookingDate = targetDate;
    }

    const oldBookingStatus = booking.bookingStatus;
    const oldPaymentStatus = booking.paymentStatus;

    if (paymentStatus === "Paid") {
      booking.paymentStatus = "Paid";
      booking.bookingStatus = "Paid";
    } else {
      if (bookingStatus) booking.bookingStatus = bookingStatus;
      if (paymentStatus) booking.paymentStatus = paymentStatus;
    }

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber");

    if (updatedBooking.user && updatedBooking.user.email) {
      if (bookingStatus === "Cancelled" && oldBookingStatus !== "Cancelled") {
        const cancelSubject = `Booking Cancelled - ${updatedBooking.venue.name}`;
        const cancelText = `Hello ${updatedBooking.user.fullName},\n\nYour booking at ${updatedBooking.venue.name} for ${updatedBooking.bookingDate} (${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}) has been cancelled.\n\nThe time slot is now available for other users.`;

        await sendEmail(
          updatedBooking.user.email,
          cancelSubject,
          cancelText
        ).catch((err) => console.error("Email send failed:", err.message));
      }

      if (
        (booking.bookingStatus === "Booked" || booking.bookingStatus === "Paid") &&
        (oldBookingStatus !== booking.bookingStatus || oldPaymentStatus !== booking.paymentStatus)
      ) {
        const confirmSubject = `Your futsal ground has been booked! - ${updatedBooking.venue.name}`;
        const confirmText = `Hello ${updatedBooking.user.fullName},\n\nGreat news! Your futsal booking at ${updatedBooking.venue.name} is confirmed and marked as ${booking.bookingStatus}.\n\nDate: ${updatedBooking.bookingDate}\nTime: ${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}\nPayment Status: ${updatedBooking.paymentStatus}\n\nSee you on the ground!`;

        await sendEmail(
          updatedBooking.user.email,
          confirmSubject,
          confirmText
        ).catch((err) => console.error("Email send failed:", err.message));
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

// Delete booking
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
      const deleteSubject = `Booking Cancelled - ${booking.venue ? booking.venue.name : "Venue"}`;
      const deleteText = `Hello ${booking.user.fullName},\n\nYour booking for ${booking.bookingDate} has been deleted and cancelled.\n\nThe time slot is now available for other users.`;

      await sendEmail(
        booking.user.email,
        deleteSubject,
        deleteText
      ).catch((err) => console.error("Email send failed:", err.message));
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