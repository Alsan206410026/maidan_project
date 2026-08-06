const express = require("express");
const router = express.Router();

const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, searchBookings } = require("../controllers/bookingController");
const { protect } = require("../middleware/authmiddleware");
const { venueAdminMiddleware } = require("../middleware/venueAdminMiddleware");

// User routes
router.get("/", protect, getAllBookings);
router.post("/", protect, createBooking);
router.get("/search", protect, searchBookings);
router.get("/:id", protect, getBookingById);

// Admin routes
router.put("/admin/:venueId/:id", protect, venueAdminMiddleware, updateBooking);
router.delete("/admin/:venueId/:id", protect, venueAdminMiddleware, deleteBooking);

module.exports = router;