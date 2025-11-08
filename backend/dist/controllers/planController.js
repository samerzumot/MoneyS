"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestPlanHandler = exports.generatePlanHandler = void 0;
const zod_1 = require("zod");
const planService_1 = require("../services/planService");
const planSchema = zod_1.z.object({
    monthlyBudget: zod_1.z.coerce.number().positive(),
    strategy: zod_1.z.enum(["avalanche", "snowball", "balanced"]).optional(),
    emergencyBuffer: zod_1.z.coerce.number().min(0).optional(),
    includeAIExplanation: zod_1.z.boolean().optional(),
});
const generatePlanHandler = async (req, res, next) => {
    try {
        const payload = planSchema.parse(req.body);
        const plan = await (0, planService_1.generatePayoffPlan)(req.user.id, payload);
        res.status(201).json(plan);
    }
    catch (error) {
        next(error);
    }
};
exports.generatePlanHandler = generatePlanHandler;
const getLatestPlanHandler = async (req, res, next) => {
    try {
        const plan = await (0, planService_1.getLatestPayoffPlan)(req.user.id);
        if (!plan) {
            res.status(404).json({ message: "No payoff plan generated yet" });
            return;
        }
        res.json(plan);
    }
    catch (error) {
        next(error);
    }
};
exports.getLatestPlanHandler = getLatestPlanHandler;
//# sourceMappingURL=planController.js.map