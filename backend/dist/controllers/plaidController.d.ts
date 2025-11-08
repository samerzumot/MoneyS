import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const createLinkTokenHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const exchangePublicTokenHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const syncLiabilitiesHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const plaidWebhookHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=plaidController.d.ts.map