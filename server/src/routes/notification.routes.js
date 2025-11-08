const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

router.get('/', notificationController.getNotifications);
router.get('/unread-count', notificationController.getUnreadCount);
router.put('/:id/read', notificationController.markAsRead);
router.put('/settings', notificationController.updateSettings);

module.exports = router;
