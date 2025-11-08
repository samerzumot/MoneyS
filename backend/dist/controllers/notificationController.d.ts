import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const listNotificationsHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const triggerNotificationSweepHandler: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=notificationController.d.ts.map