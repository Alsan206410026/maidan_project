const express = require("express");
const router = express.Router();

const {
    getTimeSlots,
    getTimeSlotById,
    searchTimeSlots,
    createTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
} = require("../controllers/timeSlotController");

const { venueAdminMiddleware } = require("../middleware/adminvenuemiddleware.js");
const { protect } = require("../middleware/authmiddleware");
const { superAdminOrAdmin } = require("../middleware/superAdminOrAdminMiddleware");

router
    .route("/")
    .get(getTimeSlots)
    .post(protect, superAdminOrAdmin,venueAdminMiddleware, createTimeSlot);

router.route("/search").get(searchTimeSlots);

router
    .route("/:id")
    .get(getTimeSlotById)
    .put(protect, superAdminOrAdmin,venueAdminMiddleware, updateTimeSlot)
    .delete(protect, superAdminOrAdmin, venueAdminMiddleware, deleteTimeSlot);

module.exports = router;