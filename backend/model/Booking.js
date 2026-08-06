const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: [true, "Venue reference is required"],
    },

    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: [true, "TimeSlot reference is required"],
    },

    bookingDate: {
      type: String, // Format: "YYYY-MM-DD" from calendar
      required: [true, "Booking date is required"],
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },

    paymentMethod: {
      type: String,
      enum: ["eSewa", "Cash"],
      required: [true, "Payment method is required"],
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      enum: ["Booked", "Paid", "Cancelled", "Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// High-performance composite index for checking available slots
BookingSchema.index({ venue: 1, slot: 1, bookingDate: 1 });

module.exports = mongoose.model("Booking", BookingSchema);