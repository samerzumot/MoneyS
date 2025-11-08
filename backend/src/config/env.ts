import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return 4000;
      const parsed = Number.parseInt(value, 10);
      if (Number.isNaN(parsed)) {
        throw new Error("PORT must be a number");
      }
      return parsed;
    }),
  DATABASE_URL: z.string().url(),
  PLAID_CLIENT_ID: z.string().optional(),
  PLAID_SECRET: z.string().optional(),
  PLAID_ENV: z.enum(["sandbox", "development", "production"]).default("sandbox"),
  OPENAI_API_KEY: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().email().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .pipe(z.number().int().positive())
    .optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  APP_BASE_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  throw new Error("Failed to validate environment configuration");
}

const {
  NODE_ENV,
  PORT = 4000,
  DATABASE_URL,
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_ENV,
  OPENAI_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  APP_BASE_URL,
} = parsed.data;

export const ENV = {
  nodeEnv: NODE_ENV,
  port: PORT,
  databaseUrl: DATABASE_URL,
  plaid: {
    clientId: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    environment: PLAID_ENV,
  },
  openAI: {
    apiKey: OPENAI_API_KEY,
  },
  firebase: {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  email: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: EMAIL_FROM,
  },
  app: {
    baseUrl: APP_BASE_URL,
  },
};

export type AppEnv = typeof ENV;
