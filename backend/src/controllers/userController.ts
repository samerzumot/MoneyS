import type { NextFunction, Response } from "express";
import { ENV } from "../config/env";
import type { AuthenticatedRequest } from "../middleware/auth";

export const getCurrentUserHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({
      user: req.user,
      config: {
        plaid: {
          enabled: Boolean(ENV.plaid.clientId && ENV.plaid.secret),
          environment: ENV.plaid.environment,
        },
        ai: {
          enabled: Boolean(ENV.openAI.apiKey),
        },
        notifications: {
          emailEnabled: Boolean(ENV.email.host && ENV.email.user),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
