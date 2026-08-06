const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: [true, "Venue ID is required"],
    },

    startTime: {
      type: String, 
      required: [true, "Start time is required"],
    },

    endTime: {
      type: String, 
      required: [true, "End time is required"],
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