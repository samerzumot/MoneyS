"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err instanceof errors_1.AppError ? err.statusCode : 500;
    const response = {
        message: err.message ?? "Internal server error",
    };
    if (err instanceof errors_1.AppError && err.details) {
        response.details = err.details;
    }
    if (process.env.NODE_ENV !== "production") {
        response.stack = err.stack;
    }
    console.error("Unhandled error", err);
    return res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map