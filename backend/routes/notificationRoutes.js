const express = require('express'); 
const router = express.Router();
const {getAllNotifications, createNotification} = require('../controllers/notificationController.js');



router.route('/').get(getAllNotifications).post(protect, createNotification);
router.route('/:id').get(getNotificationById).put(protect, updateNotification).delete(protect, deleteNotification);

module.exports = router;