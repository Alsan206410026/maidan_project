const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    startTime: {
      type: String, // e.g., "06:00" (24-hour format)
      required: true,
    },
    endTime: {
      type: String, // e.g., "07:00"
      required: true,
    },
    price: {
      type: Number,
      required: true, // Slot-specific pricing (e.g., peak vs. off-peak hours)
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeSlot", TimeSlotSchema);