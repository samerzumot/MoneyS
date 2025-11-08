"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plaidController_1 = require("../controllers/plaidController");
const router = (0, express_1.Router)();
router.post("/link-token", plaidController_1.createLinkTokenHandler);
router.post("/exchange", plaidController_1.exchangePublicTokenHandler);
router.post("/sync", plaidController_1.syncLiabilitiesHandler);
exports.default = router;
//# sourceMappingURL=plaidRoutes.js.map