const express = require("express");
const router = express.Router();
const { registerUser, loginUser,getUsers} = require("../controllers/authController.js");
const { protect } = require("../middleware/authmiddleware.js");
const { superAdmin } = require("../middleware/superAdminmiddleware.js");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, superAdmin, getUsers);



module.exports = router;