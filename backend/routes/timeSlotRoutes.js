const express = require("express");
const router = express.Router();

const { getTimeSlots, getTimeSlotById, searchTimeSlots, createTimeSlot, updateTimeSlot, deleteTimeSlot } = require("../controllers/timeSlotController");
const { protect } = require("../middleware/authmiddleware");
const { venueAdminMiddleware } = require("../middleware/venueAdminMiddleware");

// User / Public routes
router.get("/", getTimeSlots);
router.get("/search", searchTimeSlots);
router.get("/:id", getTimeSlotById);

// Admin routes
router.post("/admin/:venueId", protect, venueAdminMiddleware, createTimeSlot);
router.put("/admin/:venueId/:id", protect, venueAdminMiddleware, updateTimeSlot);
router.delete("/admin/:venueId/:id", protect, venueAdminMiddleware, deleteTimeSlot);

module.exports = router;