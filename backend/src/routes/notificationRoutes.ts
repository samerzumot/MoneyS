import { Router } from "express";
import {
  listNotificationsHandler,
  triggerNotificationSweepHandler,
} from "../controllers/notificationController";

const router = Router();

router.get("/", listNotificationsHandler);
router.post("/dispatch", triggerNotificationSweepHandler);

export default router;
