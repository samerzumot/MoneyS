const { getAuth } = require('../config/firebase');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // For development without Firebase
    if (process.env.NODE_ENV === 'development' && !process.env.FIREBASE_PROJECT_ID) {
      req.user = {
        uid: 'dev-user-id',
        email: 'dev@example.com'
      };
      return next();
    }

    // Verify Firebase token
    const auth = getAuth();
    if (!auth) {
      return res.status(500).json({ error: 'Authentication service unavailable' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };
