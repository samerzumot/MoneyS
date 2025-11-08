import { Router } from "express";
import { getCurrentUserHandler } from "../controllers/userController";

const router = Router();

router.get("/me", getCurrentUserHandler);

export default router;
