import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
import { getDashboardSummary } from "../services/dashboardService";

export const dashboardSummaryHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const summary = await getDashboardSummary(req.user!.id);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};
