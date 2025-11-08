const { User } = require('../models');

class UserService {
  async findOrCreateUser(firebaseUid, email, name = null) {
    try {
      let [user, created] = await User.findOrCreate({
        where: { firebaseUid },
        defaults: {
          firebaseUid,
          email,
          name
        }
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to find or create user: ${error.message}`);
    }
  }

  async getUserByFirebaseUid(firebaseUid) {
    try {
      return await User.findOne({ where: { firebaseUid } });
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  async updateUser(userId, updates) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update(updates);
      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async updateNotificationSettings(userId, settings) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      await user.update({
        notificationSettings: {
          ...user.notificationSettings,
          ...settings
        }
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to update notification settings: ${error.message}`);
    }
  }

  async completeOnboarding(userId) {
    try {
      return await this.updateUser(userId, { onboardingCompleted: true });
    } catch (error) {
      throw new Error(`Failed to complete onboarding: ${error.message}`);
    }
  }
}

module.exports = new UserService();
