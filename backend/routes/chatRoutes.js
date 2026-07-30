const express = require("express");
const router = express.Router();

const {
    getMyChats,
    getChatHistory,
    markAsRead
} = require("../controllers/chatController");

const { protect } = require("../middleware/authMiddleware");

router.route("/")
    .get(protect, getMyChats);

router.route("/:userId")
    .get(protect, getChatHistory);

router.route("/read/:messageId")
    .patch(protect, markAsRead);

module.exports = router;