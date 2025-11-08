import admin from "firebase-admin";
import { ENV } from "./env";

let firebaseApp: admin.app.App | null = null;

export const getFirebaseAdminApp = (): admin.app.App | null => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const { projectId, clientEmail, privateKey } = ENV.firebase;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("Firebase Admin credentials are not fully configured. Some features may be disabled.");
    return null;
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  return firebaseApp;
};

export const verifyFirebaseToken = async (token: string) => {
  const app = getFirebaseAdminApp();
  if (!app) {
    throw new Error("Firebase Admin not configured");
  }

  return app.auth().verifyIdToken(token);
};
