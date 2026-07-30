const TimeSlot = require("../model/TimeSlot.js");

// Get all time slots
const getTimeSlots = async (req, res) => {
    try {

        const slots = await TimeSlot.find()
            .populate("venue", "name");

        return res.status(200).json(slots);

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Get time slot by ID
const getTimeSlotById = async (req, res) => {

    try {

        const slot = await TimeSlot.findById(req.params.id)
            .populate("venue", "name");

        if (!slot) {
            return res.status(404).json({
                message: "Time slot not found",
            });
        }

        return res.status(200).json(slot);

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

};

// Search by venue
const searchTimeSlots = async (req, res) => {

    const { venue } = req.query;

    try {

        const filter = {};

        if (venue) {
            filter.venue = venue;
        }

        const slots = await TimeSlot.find(filter)
            .populate("venue", "name");

        return res.status(200).json(slots);

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

};

// Create time slot
const createTimeSlot = async (req, res) => {

    const {
        venue,
        day,
        startTime,
        endTime,
        status,
    } = req.body;

    try {

        if (!venue || !day || !startTime || !endTime) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const exists = await TimeSlot.findOne({
            venue,
            day,
            startTime,
            endTime,
        });

        if (exists) {
            return res.status(400).json({
                message: "Time slot already exists",
            });
        }

        const slot = await TimeSlot.create({
            venue,
            day,
            startTime,
            endTime,
            status,
        });

        return res.status(201).json(slot);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

};

// Update time slot
const updateTimeSlot = async (req, res) => {

    const {
        day,
        startTime,
        endTime,
        status,
    } = req.body;

    const slot = await TimeSlot.findById(req.params.id);

    if (!slot) {
        return res.status(404).json({
            message: "Time slot not found",
        });
    }

    slot.day = day || slot.day;
    slot.startTime = startTime || slot.startTime;
    slot.endTime = endTime || slot.endTime;
    slot.status = status || slot.status;

    await slot.save();

    return res.status(200).json(slot);

};

// Delete time slot
const deleteTimeSlot = async (req, res) => {

    try {

        const slot = await TimeSlot.findByIdAndDelete(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: "Time slot not found",
            });
        }

        return res.status(200).json({
            message: "Time slot deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
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