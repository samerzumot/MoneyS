const userService = require('../services/user.service');

class UserController {
  async getProfile(req, res, next) {
    try {
      const { uid: firebaseUid, email, name } = req.user;
      
      // Find or create user
      const user = await userService.findOrCreateUser(firebaseUid, email, name);
      
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        onboardingCompleted: user.onboardingCompleted,
        createdAt: user.createdAt
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const updatedUser = await userService.updateUser(user.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async getSettings(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      res.json({
        notificationSettings: user.notificationSettings
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const updatedUser = await userService.updateNotificationSettings(user.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async completeOnboarding(req, res, next) {
    try {
      const { uid: firebaseUid } = req.user;
      const user = await userService.getUserByFirebaseUid(firebaseUid);
      
      const updatedUser = await userService.completeOnboarding(user.id);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
