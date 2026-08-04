const express = require("express");
const router = express.Router();
const { registerUser, loginUser,getUsers, verifyOtp , forgotPassword, resetPassword, logoutUser, getMe } = require("../controllers/authController.js");
const { registerLimiter, loginLimiter } = require("../middleware/ratelimitermiddleware.js");
const { protect } = require("../middleware/authmiddleware.js");
const { superAdmin } = require("../middleware/superAdminmiddleware.js");



router.post("/register",registerLimiter, registerUser);
router.post("/login",loginLimiter, loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);
router.get("/users", protect, superAdmin, getUsers);

//verify otp
router.post("/verify-otp", verifyOtp);

//protected route to get current user
router.get("/me", protect, getMe);




module.exports = router;