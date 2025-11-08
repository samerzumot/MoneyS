import type { NextFunction, Request, Response } from "express";
import { getFirebaseAdminApp, verifyFirebaseToken } from "../config/firebase";
import { prisma } from "../utils/prisma";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    firebaseUid: string;
    email?: string | null;
    displayName?: string | null;
  };
}

const firebaseEnabled = Boolean(getFirebaseAdminApp());

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    let firebaseUid: string | undefined;
    let email: string | undefined;
    let displayName: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      const idToken = authHeader.replace("Bearer ", "").trim();
      if (!firebaseEnabled) {
        return res.status(501).json({
          message:
            "Firebase authentication is not configured. Provide credentials or use development overrides.",
        });
      }

      const decoded = await verifyFirebaseToken(idToken);
      firebaseUid = decoded.uid;
      email = decoded.email ?? undefined;
      displayName = decoded.name ?? decoded.firebase?.sign_in_provider ?? undefined;
    } else if (process.env.NODE_ENV !== "production") {
      const mockUid = (req.headers["x-user-id"] as string) ?? "dev-user";
      firebaseUid = mockUid;
      email = (req.headers["x-user-email"] as string) ?? "dev@example.com";
      displayName = (req.headers["x-user-name"] as string) ?? "Developer";
    } else {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    if (!firebaseUid) {
      return res.status(401).json({ message: "Unable to determine user identity" });
    }

    const user = await prisma.user.upsert({
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

    (req as AuthenticatedRequest).user = {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
    };

    return next();
  } catch (error) {
    console.error("Authentication error", error);
    return res.status(401).json({ message: "Invalid authentication token" });
  }
};
