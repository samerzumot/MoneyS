"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardSummaryHandler = void 0;
const dashboardService_1 = require("../services/dashboardService");
const dashboardSummaryHandler = async (req, res, next) => {
    try {
        const summary = await (0, dashboardService_1.getDashboardSummary)(req.user.id);
        res.json(summary);
    }
    catch (error) {
        next(error);
    }
};
exports.dashboardSummaryHandler = dashboardSummaryHandler;
//# sourceMappingURL=dashboardController.js.map