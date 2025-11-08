import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const listDebts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createDebtHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateDebtHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteDebtHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const recordPaymentHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=debtController.d.ts.map