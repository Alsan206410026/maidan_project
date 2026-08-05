const express = require("express");
const router = express.Router();
const {
  getVenues,
  createVenue,
  getVenueById,
  updateVenue,
  updateVenueByAdmin,
  deleteVenue,
  SearchVenues,
  getAdminVenues,
} = require("../controllers/venueController.js");

const { protect } = require("../middleware/authmiddleware.js");
const { superAdmin } = require("../middleware/superAdminMiddleware.js");
const { superAdminOrAdmin } = require("../middleware/superAdminorAdminMiddleware.js");
const { venueAdminMiddleware } = require("../middleware/venueAdminMiddleware.js");

const upload = require("../middleware/venuemiddleware.js");


router.route("/").get(getVenues).post(protect, superAdmin, upload.single("image"), createVenue);
router.get("/search", SearchVenues);


router.route("/my-venue").get(protect, getAdminVenues);
router.route("/admin/:id").put(protect, venueAdminMiddleware, upload.single("image"), updateVenueByAdmin);

router.route("/:id").get(getVenueById).put(protect, superAdmin, upload.single("image"), updateVenue).delete(protect, superAdmin, deleteVenue);

module.exports = router;