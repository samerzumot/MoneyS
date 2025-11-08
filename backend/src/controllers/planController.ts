import type { NextFunction, Response } from "express";
import { z } from "zod";
import type { AuthenticatedRequest } from "../middleware/auth";
import { generatePayoffPlan, getLatestPayoffPlan } from "../services/planService";

const planSchema = z.object({
  monthlyBudget: z.coerce.number().positive(),
  strategy: z.enum(["avalanche", "snowball", "balanced"]).optional(),
  emergencyBuffer: z.coerce.number().min(0).optional(),
  includeAIExplanation: z.boolean().optional(),
});

export const generatePlanHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = planSchema.parse(req.body);
    const plan = await generatePayoffPlan(req.user!.id, payload);
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
};

export const getLatestPlanHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const plan = await getLatestPayoffPlan(req.user!.id);
    if (!plan) {
      res.status(404).json({ message: "No payoff plan generated yet" });
      return;
    }
    res.json(plan);
  } catch (error) {
    next(error);
  }
};
