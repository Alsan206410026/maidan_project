const express = require("express");
const router = express.Router();

const { getTimeSlots, getTimeSlotById, searchTimeSlots, createTimeSlot, updateTimeSlot, deleteTimeSlot } = require("../controllers/timeSlotController");
const { protect } = require("../middleware/authmiddleware");
const { venueAdminMiddleware } = require("../middleware/venueAdminMiddleware");

// Public / User routes
router.get("/", getTimeSlots);
router.post("/", protect, venueAdminMiddleware, createTimeSlot);
router.get("/search", searchTimeSlots);
router.get("/:id", getTimeSlotById);

// Admin routes
router.put("/admin/:venueId/:id", protect, venueAdminMiddleware, updateTimeSlot);
router.delete("/admin/:venueId/:id", protect, venueAdminMiddleware, deleteTimeSlot);

module.exports = router;