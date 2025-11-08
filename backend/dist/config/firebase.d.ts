import admin from "firebase-admin";
export declare const getFirebaseAdminApp: () => admin.app.App | null;
export declare const verifyFirebaseToken: (token: string) => Promise<import("firebase-admin/lib/auth/token-verifier").DecodedIdToken>;
//# sourceMappingURL=firebase.d.ts.map