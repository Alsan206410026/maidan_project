const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");

const { protect } = require("../middleware/authmiddleware");

// Get all messages between logged-in user and another user
router.get("/:id", protect, getMessages);

// Send a message to another user (Added /send/ to match frontend axios requests)
router.post("/send/:id", protect, sendMessage);

module.exports = router;