import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env";
import { plaidWebhookHandler } from "./controllers/plaidController";
import { authMiddleware } from "./middleware/auth";
import { errorHandler } from "./middleware/errorHandler";
import apiRouter from "./routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const allowedOrigins = ENV.app.baseUrl ? [ENV.app.baseUrl] : [];
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/plaid/webhook", plaidWebhookHandler);

app.use("/api", authMiddleware, apiRouter);

app.use(errorHandler);

export default app;
