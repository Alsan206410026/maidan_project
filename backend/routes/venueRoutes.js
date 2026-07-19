const express = require("express");
const router = express.Router();
const {getVenues, createVenue,getVenueById,updateVenue,deleteVenue , SearchVenues} = require("../controllers/venueController.js");
const { protect } = require("../middleware/authmiddleware.js");
const { admin } = require("../middleware/adminMiddleware.js");
const  upload  = require("../middleware/venuemiddleware.js");


router.route("/").get(getVenues).post(protect, admin, upload.single("image"), createVenue);
router.get("/search", SearchVenues); 
router.route("/:id").get(getVenueById).put(protect, admin, updateVenue).delete(protect, admin, deleteVenue);



module.exports = router;