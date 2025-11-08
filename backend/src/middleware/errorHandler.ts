import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const response: Record<string, unknown> = {
    message: err.message ?? "Internal server error",
  };

  if (err instanceof AppError && err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  console.error("Unhandled error", err);
  return res.status(statusCode).json(response);
};
