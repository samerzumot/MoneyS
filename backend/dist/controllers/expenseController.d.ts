import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const listExpenses: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createExpenseHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateExpenseHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteExpenseHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const markExpensePaidHandler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=expenseController.d.ts.map