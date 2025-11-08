import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const generatePlanHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getLatestPlanHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=planController.d.ts.map