const TimeSlot = require("../model/TimeSlot");
const Booking = require("../model/Booking");
const Venue = require("../model/Venue");

// Get available time slots for a specific date and venue
const getTimeSlots = async (req, res) => {
  try {
    const { venueId, date } = req.query;

    if (!venueId) {
      return res.status(400).json({ success: false, message: "Venue ID is required." });
    }

    const masterSlots = await TimeSlot.find({ venue: venueId, status: "Active" }).sort({ startTime: 1 });

    if (!date) {
      return res.status(200).json({ success: true, count: masterSlots.length, data: masterSlots });
    }

    const existingBookings = await Booking.find({
      venue: venueId,
      bookingDate: date,
      bookingStatus: { $in: ["Booked", "Paid"] }
    });

    const bookedSlotIds = existingBookings.map((b) => b.slot.toString());
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const availableSlots = masterSlots.filter((slot) => {
      if (bookedSlotIds.includes(slot._id.toString())) return false;

      if (date === todayStr) {
        const [endHour, endMinute] = slot.endTime.split(":").map(Number);
        const slotEndTime = new Date();
        slotEndTime.setHours(endHour, endMinute, 0, 0);
        if (now >= slotEndTime) return false;
      }

      return true;
    });

    return res.status(200).json({
      success: true,
      bookingDate: date,
      count: availableSlots.length,
      data: availableSlots
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get single time slot by ID
const getTimeSlotById = async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id).populate("venue", "name location");
    if (!slot) return res.status(404).json({ success: false, message: "Time slot not found." });
    return res.status(200).json({ success: true, data: slot });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Search time slots
const searchTimeSlots = async (req, res) => {
  try {
    const { venueId, status, startTime, endTime } = req.query;
    let query = {};
    if (venueId) query.venue = venueId;
    if (status) query.status = status;
    if (startTime) query.startTime = startTime;
    if (endTime) query.endTime = endTime;

    const slots = await TimeSlot.find(query).populate("venue", "name location").sort({ startTime: 1 });
    return res.status(200).json({ success: true, count: slots.length, data: slots });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new time slot
const createTimeSlot = async (req, res) => {
  try {
    const { venueId, startTime, endTime } = req.body;
    const newSlot = await TimeSlot.create({
      venue: venueId,
      startTime, endTime,
      status: "Active"
    });
    return res.status(201).json({ success: true, data: newSlot });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a time slot
const updateTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
     { returnDocument: "after" }
    );
    return res.status(200).json({ success: true, data: slot });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a time slot
const deleteTimeSlot = async (req, res) => {
  try {
    const activeBookings = await Booking.find({
      slot: req.params.id,
      bookingStatus: { $in: ["Booked", "Paid", "Pending"] }
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({ success: false, message: "Cannot delete slot with active bookings." });
    }

    await TimeSlot.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Time slot deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTimeSlots,
  getTimeSlotById,
  searchTimeSlots,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
};