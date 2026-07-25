const express = require("express");
const router = express.Router();
const { registerUser, loginUser,getUsers, verifyOtp , forgotPassword, resetPassword } = require("../controllers/authController.js");
const { registerLimiter, loginLimiter } = require("../middleware/ratelimitermiddleware.js");
const { protect } = require("../middleware/authmiddleware.js");
const { superAdmin } = require("../middleware/superAdminmiddleware.js");



router.post("/register",registerLimiter, registerUser);
router.post("/login",loginLimiter, loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", protect, superAdmin, getUsers);
//verify otp
router.post("/verify-otp", verifyOtp);




module.exports = router;