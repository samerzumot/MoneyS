"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const scheduler_1 = require("./services/scheduler");
const prisma_1 = require("./utils/prisma");
const server = app_1.default.listen(env_1.ENV.port, () => {
    console.log(`🚀 Server ready on port ${env_1.ENV.port}`);
    (0, scheduler_1.registerSchedulers)();
});
const shutdown = async (signal) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(async () => {
        await prisma_1.prisma.$disconnect();
        process.exit(0);
    });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
//# sourceMappingURL=index.js.map