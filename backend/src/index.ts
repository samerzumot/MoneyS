import app from "./app";
import { ENV } from "./config/env";
import { registerSchedulers } from "./services/scheduler";
import { prisma } from "./utils/prisma";

const server = app.listen(ENV.port, () => {
  console.log(`🚀 Server ready on port ${ENV.port}`);
  registerSchedulers();
});

const shutdown = async (signal: NodeJS.Signals) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
