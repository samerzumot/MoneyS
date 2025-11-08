const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Check if already initialized
    if (admin.apps.length > 0) {
      return admin.app();
    }

    // Initialize with service account
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
      })
    });

    console.log('✅ Firebase Admin initialized successfully');
    return admin.app();
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    // For development, we'll continue without Firebase
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Running without Firebase authentication');
      return null;
    }
    throw error;
  }
};

const getAuth = () => {
  try {
    return admin.auth();
  } catch (error) {
    console.error('Firebase Auth error:', error);
    return null;
  }
};

module.exports = {
  initializeFirebase,
  getAuth,
  admin
};
