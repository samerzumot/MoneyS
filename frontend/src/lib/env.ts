import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().optional(),
  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_PLAID_ENV: z.string().optional(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("Invalid Vite environment configuration", parsed.error.flatten().fieldErrors);
  throw new Error("Failed to parse environment variables");
}

const {
  VITE_API_BASE_URL,
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_PLAID_ENV,
} = parsed.data;

export const appEnv = {
  apiBaseUrl: VITE_API_BASE_URL ?? "http://localhost:4000/api",
  firebase: {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_PROJECT_ID,
    appId: VITE_FIREBASE_APP_ID,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    measurementId: VITE_FIREBASE_MEASUREMENT_ID,
    storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  },
  plaid: {
    environment: VITE_PLAID_ENV ?? "sandbox",
  },
};

export type AppEnv = typeof appEnv;
