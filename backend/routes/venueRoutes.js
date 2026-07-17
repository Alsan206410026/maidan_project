const express = require("express");
const router = express.Router();
const {getVenues, createVenue} = require("../controllers/venueController.js");
const { protect } = require("../middleware/authmiddleware.js");
const { admin } = require("../middleware/adminMiddleware.js");


router.route("/").get(getVenues).post(protect, admin, createVenue);
// router.route("/:id").get(getVenueById).put(protect, admin, updateVenue).delete(protect, admin, deleteVenue);


module.exports = router;