import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
  signOut,
} from "firebase/auth";
import { appEnv } from "./env";

let firebaseApp: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (!appEnv.firebase.apiKey || !appEnv.firebase.projectId) {
    return null;
  }

  if (!getApps().length) {
    firebaseApp = initializeApp({
      apiKey: appEnv.firebase.apiKey,
      authDomain: appEnv.firebase.authDomain,
      projectId: appEnv.firebase.projectId,
      appId: appEnv.firebase.appId,
      messagingSenderId: appEnv.firebase.messagingSenderId,
      measurementId: appEnv.firebase.measurementId,
      storageBucket: appEnv.firebase.storageBucket,
    });
  } else {
    firebaseApp = getApps()[0]!;
  }

  return firebaseApp;
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  if (!app) {
    return null;
  }
  return getAuth(app);
};

export const signInWithGooglePopup = async (): Promise<User | null> => {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const firebaseSignOut = async () => {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await signOut(auth);
};
