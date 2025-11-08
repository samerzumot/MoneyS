import { Router } from "express";
import { dashboardSummaryHandler } from "../controllers/dashboardController";

const router = Router();

router.get("/summary", dashboardSummaryHandler);

export default router;
