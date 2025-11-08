"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]).default("development"),
    PORT: zod_1.z
        .string()
        .optional()
        .transform((value) => {
        if (!value)
            return 4000;
        const parsed = Number.parseInt(value, 10);
        if (Number.isNaN(parsed)) {
            throw new Error("PORT must be a number");
        }
        return parsed;
    }),
    DATABASE_URL: zod_1.z.string().url(),
    PLAID_CLIENT_ID: zod_1.z.string().optional(),
    PLAID_SECRET: zod_1.z.string().optional(),
    PLAID_ENV: zod_1.z.enum(["sandbox", "development", "production"]).default("sandbox"),
    OPENAI_API_KEY: zod_1.z.string().optional(),
    FIREBASE_PROJECT_ID: zod_1.z.string().optional(),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string().email().optional(),
    FIREBASE_PRIVATE_KEY: zod_1.z.string().optional(),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z
        .string()
        .transform((value) => parseInt(value, 10))
        .pipe(zod_1.z.number().int().positive())
        .optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
    EMAIL_FROM: zod_1.z.string().email().optional(),
    APP_BASE_URL: zod_1.z.string().optional(),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
    throw new Error("Failed to validate environment configuration");
}
const { NODE_ENV, PORT = 4000, DATABASE_URL, PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV, OPENAI_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, APP_BASE_URL, } = parsed.data;
exports.ENV = {
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
//# sourceMappingURL=env.js.map