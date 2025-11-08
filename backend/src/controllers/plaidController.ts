import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import type { AuthenticatedRequest } from "../middleware/auth";
import {
  createLinkToken,
  exchangePublicToken,
  syncAllPlaidLiabilities,
} from "../services/plaidService";

const exchangeSchema = z.object({
  publicToken: z.string().min(1),
});

export const createLinkTokenHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await createLinkToken(req.user!.id);
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export const exchangePublicTokenHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = exchangeSchema.parse(req.body);
    await exchangePublicToken(req.user!.id, payload.publicToken);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const syncLiabilitiesHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await syncAllPlaidLiabilities(req.user!.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const plaidWebhookHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Plaid webhooks can be used to trigger re-sync logic.
    console.log("Received Plaid webhook", req.body);
    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};
