const express = require("express");
const router = express.Router();
const { getAdminsForSidebar } = require("../controllers/user.controller.js");
const { protect } = require("../middleware/authmiddleware.js");

router.get("/getAdmins",protect, getAdminsForSidebar);

module.exports = router;