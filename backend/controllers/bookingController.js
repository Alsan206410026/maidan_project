const Booking = require("../model/Booking");
const TimeSlot = require("../model/TimeSlot");
const Venue = require("../model/Venue");
const Transaction = require("../model/Transaction");
const sendEmail = require("../utils/sendEmail");

// create a new booking
const createBooking = async (req, res) => {
  try {
    const venueId = req.body.venueId || req.body.venue;
    const slotId = req.body.slotId || req.body.slot;
    const { bookingDate, paymentMethod, transactionId } = req.body;
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
        message: "Selected time slot is invalid or inactive.",
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
      bookingStatus: { $in: ["Booked", "Pending"] },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already reserved or pending confirmation.",
      });
    }

    let finalTransactionId = transactionId;

    if (!finalTransactionId) {
      const isCash = paymentMethod.toLowerCase() === "cash";
      const newTransaction = await Transaction.create({
        customerDetails: {
          name: req.user.fullName || "Customer",
          email: req.user.email || "no-email@maidan.com",
          phone: req.user.phoneNumber || "0000000000",
        },
        product_name: `Booking for ${venue.name}`,
        product_id: `${venueId}_${slotId}_${bookingDate}`,
        amount: venue.price || venue.pricePerHour || 0,
        payment_gateway: isCash ? "cash" : "esewa",
        status: isCash ? "PENDING" : "PENDING",
      });

      finalTransactionId = newTransaction._id;
    }

    const isCashPayment = paymentMethod.toLowerCase() === "cash";
    const bookingStatus = isCashPayment ? "Pending" : "Pending";
    const paymentStatus = isCashPayment ? "Pending" : "Pending";

    const booking = await Booking.create({
      user: userId,
      venue: venueId,
      slot: slotId,
      bookingDate,
      totalAmount: venue.price || venue.pricePerHour || 0,
      paymentMethod,
      paymentStatus,
      transaction: finalTransactionId,
      bookingStatus,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
      .populate("transaction");

    if (populatedBooking?.user?.email) {
      const subject = `Booking Request Received - ${populatedBooking.venue.name}`;
      const message =
        `Hello ${populatedBooking.user.fullName || "User"},\n\n` +
        `Thank you for booking with ${populatedBooking.venue.name}.\n\n` +
        `Booking Date: ${bookingDate}\n` +
        `Time: ${populatedBooking.slot.startTime} - ${populatedBooking.slot.endTime}\n` +
        `Payment Method: ${paymentMethod}\n` +
        `Booking Status: ${bookingStatus}\n` +
        `Amount: NRs. ${populatedBooking.totalAmount}\n\n` +
        `Thank you for choosing Maidan.`;

      await sendEmail(populatedBooking.user.email, subject, message).catch((err) =>
        console.error("Email notification failed:", err.message)
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

//get all bookings
const getAllBookings = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "admin") {
      if (req.venue) {
        query.venue = req.venue._id;
      } else {
        const managedVenues = await Venue.find({ admin: req.user._id }).select("_id");
        const venueIds = managedVenues.map((v) => v._id);
        query.venue = { $in: venueIds };
      }
    } else if (req.user.role !== "super_admin") {
      query.user = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
      .populate("transaction")
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

//get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("venue", "name location images price admin")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
      .populate("transaction");

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

//search/filter bookings
const searchBookings = async (req, res) => {
  try {
    const { date, bookingStatus, paymentStatus, venueId } = req.query;
    let query = {};

    if (req.user.role === "admin") {
      if (req.venue) {
        query.venue = req.venue._id;
      } else {
        const managedVenues = await Venue.find({ admin: req.user._id }).select("_id");
        query.venue = { $in: managedVenues.map((v) => v._id) };
      }
    } else if (req.user.role !== "super_admin") {
      query.user = req.user._id;
    }

    if (date) query.bookingDate = date;
    if (bookingStatus) query.bookingStatus = bookingStatus;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (venueId && ["super_admin", "admin"].includes(req.user.role)) {
      query.venue = venueId;
    }

    const bookings = await Booking.find(query)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
      .populate("transaction")
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

//update booking
const updateBooking = async (req, res) => {
  try {
    const { slotId, bookingDate, bookingStatus, paymentStatus, transactionStatus } = req.body;

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
      (bookingStatus === "Booked" || bookingStatus === "Completed") &&
      booking.bookingStatus !== "Booked";

    if (slotId || bookingDate || isActivating) {
      const conflictBooking = await Booking.findOne({
        _id: { $ne: booking._id },
        venue: booking.venue,
        slot: targetSlot,
        bookingDate: targetDate,
        bookingStatus: { $in: ["Booked", "Pending"] },
      });

      if (conflictBooking) {
        return res.status(400).json({
          success: false,
          message: "The selected slot is already booked for that date.",
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

    if (transactionStatus && booking.transaction) {
      await Transaction.findByIdAndUpdate(booking.transaction, {
        status: transactionStatus,
      });
    }

    const updatedBooking = await Booking.findById(booking._id)
      .populate("venue", "name location images price")
      .populate("slot", "startTime endTime")
      .populate("user", "fullName email phoneNumber")
      .populate("transaction");

    if (
      updatedBooking?.user?.email &&
      (oldBookingStatus !== booking.bookingStatus || oldPaymentStatus !== booking.paymentStatus)
    ) {
      let subject = "";
      let message = "";

      switch (booking.bookingStatus) {
        case "Pending":
          subject = `Booking Pending - ${updatedBooking.venue.name}`;
          message = `Hello ${updatedBooking.user.fullName},\n\nYour booking request is currently pending review.`;
          break;

        case "Booked":
          subject = `Booking Confirmed - ${updatedBooking.venue.name}`;
          message =
            `Hello ${updatedBooking.user.fullName},\n\n` +
            `Your booking has been confirmed for ${updatedBooking.bookingDate} ` +
            `(${updatedBooking.slot.startTime} - ${updatedBooking.slot.endTime}).`;
          break;

        case "Completed":
          subject = `Booking Completed - ${updatedBooking.venue.name}`;
          message = `Hello ${updatedBooking.user.fullName},\n\nThank you for playing at ${updatedBooking.venue.name}! Your booking is completed.`;
          break;

        case "Cancelled":
          subject = `Booking Cancelled - ${updatedBooking.venue.name}`;
          message = `Hello ${updatedBooking.user.fullName},\n\nYour booking for ${updatedBooking.bookingDate} has been cancelled.`;
          break;
      }

      if (subject && message) {
        await sendEmail(updatedBooking.user.email, subject, message).catch((err) =>
          console.error("Email send failed:", err.message)
        );
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

//delete booking
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

    if (booking.transaction) {
      await Transaction.findByIdAndDelete(booking.transaction);
    }

    if (booking.user?.email) {
      const subject = `Booking Cancelled & Deleted - ${booking.venue?.name || "Venue"}`;
      const message =
        `Hello ${booking.user.fullName},\n\n` +
        `Your booking for ${booking.bookingDate} has been removed by the administrator.\n\n` +
        `Thank you,\nMaidan`;

      await sendEmail(booking.user.email, subject, message).catch((err) =>
        console.error("Email send failed:", err.message)
      );
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