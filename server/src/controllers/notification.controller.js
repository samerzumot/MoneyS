const notificationService = require('../services/notification.service');
const userService = require('../services/user.service');

class NotificationController {
  async getNotifications(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { unreadOnly } = req.query;
      
      const notifications = await notificationService.getNotifications(
        user.id,
        unreadOnly === 'true'
      );
      
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const count = await notificationService.getUnreadCount(user.id);
      res.json({ count });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      const { id } = req.params;
      
      const notification = await notificationService.markAsRead(id, user.id);
      res.json(notification);
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const updatedUser = await userService.updateNotificationSettings(user.id, req.body);
      res.json(updatedUser.notificationSettings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
