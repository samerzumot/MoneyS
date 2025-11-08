import { Router } from "express";
import {
  createLinkTokenHandler,
  exchangePublicTokenHandler,
  syncLiabilitiesHandler,
} from "../controllers/plaidController";

const router = Router();

router.post("/link-token", createLinkTokenHandler);
router.post("/exchange", exchangePublicTokenHandler);
router.post("/sync", syncLiabilitiesHandler);

export default router;
