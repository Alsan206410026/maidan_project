const express = require("express");
const router = express.Router();
const {getVenues, createVenue,getVenueById,updateVenue,deleteVenue, SearchVenues} = require("../controllers/venueController.js");
const { protect } = require("../middleware/authmiddleware.js");
const { superAdmin } = require("../middleware/superAdminMiddleware.js");
const { superAdminOrAdmin } = require("../middleware/superAdminorAdminMiddleware.js");
const { venueAdminMiddleware } = require("../middleware/adminvenuemiddleware.js");

const  upload  = require("../middleware/venuemiddleware.js");


router.route("/").get(getVenues).post(protect, superAdmin, upload.single("image"), createVenue);
router.get("/search", SearchVenues); 
router.route("/:id").get(getVenueById).put(protect, superAdminOrAdmin,venueAdminMiddleware, upload.single("image"), updateVenue).delete(protect, superAdmin, deleteVenue);





module.exports = router;