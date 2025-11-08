"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserHandler = void 0;
const env_1 = require("../config/env");
const getCurrentUserHandler = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        res.json({
            user: req.user,
            config: {
                plaid: {
                    enabled: Boolean(env_1.ENV.plaid.clientId && env_1.ENV.plaid.secret),
                    environment: env_1.ENV.plaid.environment,
                },
                ai: {
                    enabled: Boolean(env_1.ENV.openAI.apiKey),
                },
                notifications: {
                    emailEnabled: Boolean(env_1.ENV.email.host && env_1.ENV.email.user),
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrentUserHandler = getCurrentUserHandler;
//# sourceMappingURL=userController.js.map