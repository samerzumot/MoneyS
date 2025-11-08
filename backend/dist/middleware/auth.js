"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebase_1 = require("../config/firebase");
const prisma_1 = require("../utils/prisma");
const firebaseEnabled = Boolean((0, firebase_1.getFirebaseAdminApp)());
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let firebaseUid;
        let email;
        let displayName;
        if (authHeader?.startsWith("Bearer ")) {
            const idToken = authHeader.replace("Bearer ", "").trim();
            if (!firebaseEnabled) {
                return res.status(501).json({
                    message: "Firebase authentication is not configured. Provide credentials or use development overrides.",
                });
            }
            const decoded = await (0, firebase_1.verifyFirebaseToken)(idToken);
            firebaseUid = decoded.uid;
            email = decoded.email ?? undefined;
            displayName = decoded.name ?? decoded.firebase?.sign_in_provider ?? undefined;
        }
        else if (process.env.NODE_ENV !== "production") {
            const mockUid = req.headers["x-user-id"] ?? "dev-user";
            firebaseUid = mockUid;
            email = req.headers["x-user-email"] ?? "dev@example.com";
            displayName = req.headers["x-user-name"] ?? "Developer";
        }
        else {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        if (!firebaseUid) {
            return res.status(401).json({ message: "Unable to determine user identity" });
        }
        const user = await prisma_1.prisma.user.upsert({
            where: { firebaseUid },
            update: {
                email: email ?? null,
                displayName: displayName ?? null,
            },
            create: {
                firebaseUid,
                email: email ?? null,
                displayName: displayName ?? null,
            },
        });
        req.user = {
            id: user.id,
            firebaseUid: user.firebaseUid,
            email: user.email,
            displayName: user.displayName,
        };
        return next();
    }
    catch (error) {
        console.error("Authentication error", error);
        return res.status(401).json({ message: "Invalid authentication token" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map