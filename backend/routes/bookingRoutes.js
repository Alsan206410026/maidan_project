const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, searchBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authmiddleware');
const {venueAdminMiddleware} = require('../middleware/adminvenuemiddleware.js');

router.route("/")
    .get(protect, getAllBookings)
    .post(protect, createBooking);

router.route("/search")
    .get(protect, searchBookings);

router.route("/:id")
    .get(protect, getBookingById)
    .put(protect,venueAdminMiddleware, updateBooking)
    .delete(protect,venueAdminMiddleware, deleteBooking);

module.exports = router;