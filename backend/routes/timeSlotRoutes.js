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

const { venueAdminMiddleware } = require("../middleware/venueAdminMiddleware.js");
const { protect } = require("../middleware/authmiddleware");
const { superAdminOrAdmin } = require("../middleware/superAdminOrAdminMiddleware");

router
    .route("/")
    .get(getTimeSlots)
    .post(protect ,venueAdminMiddleware, createTimeSlot);

router.route("/search").get(searchTimeSlots);

router
    .route("/:id")
    .get(getTimeSlotById)
    .put(protect,venueAdminMiddleware, updateTimeSlot)
    .delete(protect, venueAdminMiddleware, deleteTimeSlot);

module.exports = router;