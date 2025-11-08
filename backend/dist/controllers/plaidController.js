"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plaidWebhookHandler = exports.syncLiabilitiesHandler = exports.exchangePublicTokenHandler = exports.createLinkTokenHandler = void 0;
const zod_1 = require("zod");
const plaidService_1 = require("../services/plaidService");
const exchangeSchema = zod_1.z.object({
    publicToken: zod_1.z.string().min(1),
});
const createLinkTokenHandler = async (req, res, next) => {
    try {
        const token = await (0, plaidService_1.createLinkToken)(req.user.id);
        res.json(token);
    }
    catch (error) {
        next(error);
    }
};
exports.createLinkTokenHandler = createLinkTokenHandler;
const exchangePublicTokenHandler = async (req, res, next) => {
    try {
        const payload = exchangeSchema.parse(req.body);
        await (0, plaidService_1.exchangePublicToken)(req.user.id, payload.publicToken);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.exchangePublicTokenHandler = exchangePublicTokenHandler;
const syncLiabilitiesHandler = async (req, res, next) => {
    try {
        await (0, plaidService_1.syncAllPlaidLiabilities)(req.user.id);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.syncLiabilitiesHandler = syncLiabilitiesHandler;
const plaidWebhookHandler = async (req, res, next) => {
    try {
        // Plaid webhooks can be used to trigger re-sync logic.
        console.log("Received Plaid webhook", req.body);
        res.status(200).json({ received: true });
    }
    catch (error) {
        next(error);
    }
};
exports.plaidWebhookHandler = plaidWebhookHandler;
//# sourceMappingURL=plaidController.js.map