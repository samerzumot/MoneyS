"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFirebaseToken = exports.getFirebaseAdminApp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_1 = require("./env");
let firebaseApp = null;
const getFirebaseAdminApp = () => {
    if (firebaseApp) {
        return firebaseApp;
    }
    const { projectId, clientEmail, privateKey } = env_1.ENV.firebase;
    if (!projectId || !clientEmail || !privateKey) {
        console.warn("Firebase Admin credentials are not fully configured. Some features may be disabled.");
        return null;
    }
    firebaseApp = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
    return firebaseApp;
};
exports.getFirebaseAdminApp = getFirebaseAdminApp;
const verifyFirebaseToken = async (token) => {
    const app = (0, exports.getFirebaseAdminApp)();
    if (!app) {
        throw new Error("Firebase Admin not configured");
    }
    return app.auth().verifyIdToken(token);
};
exports.verifyFirebaseToken = verifyFirebaseToken;
//# sourceMappingURL=firebase.js.map