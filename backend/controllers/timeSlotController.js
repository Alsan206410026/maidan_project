const TimeSlot = require("../model/TimeSlot");
const Booking = require("../model/Booking");
const Venue = require("../model/Venue");

//get time slot
const getTimeSlots = async (req, res) => {
  try {
    const { venueId, date } = req.query;

    if (!venueId) {
      return res.status(400).json({
        success: false,
        message: "Venue ID is required.",
      });
    }

    // 1. Fetch active master time slots set by Admin
    const activeMasterSlots = await TimeSlot.find({
      venue: venueId,
      status: "Active",
    }).sort({ startTime: 1 });

    // If no date parameter is passed, return all active master slots
    if (!date) {
      return res.status(200).json({
        success: true,
        count: activeMasterSlots.length,
        data: activeMasterSlots,
      });
    }

    // 2. Fetch reserved/booked slot IDs for the specific date
    const reservedBookings = await Booking.find({
      venue: venueId,
      bookingDate: date,
      bookingStatus: { $in: ["Booked", "Paid"] },
    }).select("slot");

    const reservedSlotIds = reservedBookings.map((b) => b.slot.toString());

    // 3. Exclude booked slots for that date
    const availableSlots = activeMasterSlots.filter(
      (slot) => !reservedSlotIds.includes(slot._id.toString())
    );

    return res.status(200).json({
      success: true,
      bookingDate: date,
      count: availableSlots.length,
      data: availableSlots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single time slot by ID
 * @route   GET /api/timeslot/:id
 * @access  Public
 */
const getTimeSlotById = async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id).populate("venue", "name location");

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Search and filter time slots (Supports Admin viewing active & inactive slots)
 * @route   GET /api/timeslot/search
 * @access  Public
 */
const searchTimeSlots = async (req, res) => {
  try {
    const { venueId, status, startTime, endTime } = req.query;
    let query = {};

    if (venueId) query.venue = venueId;
    if (status) query.status = status; // Allows searching for 'Active' or 'Inactive'
    if (startTime) query.startTime = startTime;
    if (endTime) query.endTime = endTime;

    const slots = await TimeSlot.find(query)
      .populate("venue", "name location")
      .sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Create a new time slot
 * @route   POST /api/timeslot
 * @access  Private (Admin / Venue Admin)
 */
const createTimeSlot = async (req, res) => {
  try {
    const { venueId, startTime, endTime, status } = req.body;

    if (!venueId || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Please provide venueId, startTime, and endTime.",
      });
    }

    // 1. Verify venue existence
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    // 2. Prevent duplicate identical slots
    const existingSlot = await TimeSlot.findOne({
      venue: venueId,
      startTime,
      endTime,
    });

    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: "A time slot with this start and end time already exists for this venue.",
      });
    }

    // 3. Create time slot
    const newSlot = await TimeSlot.create({
      venue: venueId,
      startTime,
      endTime,
      status: status || "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Time slot created successfully.",
      data: newSlot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update a time slot (Times or Active/Inactive status)
 * @route   PUT /api/timeslot/:id
 * @access  Private (Admin / Venue Admin)
 */
const updateTimeSlot = async (req, res) => {
  try {
    const { startTime, endTime, status } = req.body;

    const slot = await TimeSlot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found.",
      });
    }

    if (startTime) slot.startTime = startTime;
    if (endTime) slot.endTime = endTime;
    if (status) slot.status = status; // Control 'Active' or 'Inactive' toggle

    await slot.save();

    return res.status(200).json({
      success: true,
      message: "Time slot updated successfully.",
      data: slot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete a time slot
 * @route   DELETE /api/timeslot/:id
 * @access  Private (Admin / Venue Admin)
 */
const deleteTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found.",
      });
    }

    // Safeguard: Prevent deletion if active or paid bookings depend on this slot
    const existingBookings = await Booking.find({
      slot: slot._id,
      bookingStatus: { $in: ["Booked", "Paid", "Pending"] },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete time slot with existing active bookings. Set status to 'Inactive' instead.",
      });
    }

    await slot.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Time slot deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTimeSlots,
  getTimeSlotById,
  searchTimeSlots,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};