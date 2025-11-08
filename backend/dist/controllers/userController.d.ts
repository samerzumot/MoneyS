import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const getCurrentUserHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map