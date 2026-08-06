const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authmiddleware");
const {getUsersForSidebar,} = require("../controllers/AdminChat.controller.js");

// Get users available for admin chat sidebar
router.get("/users", protect, getUsersForSidebar);

module.exports = router;