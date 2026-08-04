const express = require("express");
const router = express.Router();
const { getAdminsForSidebar } = require("../controllers/user.controller.js");
const { getSuperAdminsForSidebar } = require("../controllers/Admin.controller.js");
const { protect } = require("../middleware/authmiddleware.js");

router.get("/getAdmins",protect, getAdminsForSidebar);
router.get("/getSuperAdmins",protect, getSuperAdminsForSidebar);

module.exports = router;