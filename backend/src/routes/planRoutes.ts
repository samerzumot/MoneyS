import { Router } from "express";
import { generatePlanHandler, getLatestPlanHandler } from "../controllers/planController";

const router = Router();

router.get("/latest", getLatestPlanHandler);
router.post("/generate", generatePlanHandler);

export default router;
