const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { superAdmin } = require('../middleware/superAdminmiddleware.js');

router.route('/:id').get(protect, getUserProfile).put(protect,superAdmin, updateUserProfile).delete(protect, superAdmin, deleteUserProfile);


module.exports = router;