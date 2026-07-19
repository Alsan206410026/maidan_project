const express = require("express");
const router = express.Router();

const {
    getVenueCategories,
    getVenueCategoryById,
    createVenueCategory,
    updateVenueCategory,
    deleteVenueCategory
} = require("../controllers/categoryController.js");

const { protect } = require("../middleware/authmiddleware.js");
const { superAdmin } = require("../middleware/superAdminmiddleware.js");

router.route("/").get(getVenueCategories).post(protect, superAdmin, createVenueCategory);
router.route("/:id").get(getVenueCategoryById).put(protect, superAdmin, updateVenueCategory).delete(protect, superAdmin, deleteVenueCategory);

module.exports = router;