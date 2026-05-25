import express from "express";
import {
  generateKundli,
  chatWithAstrologyBot,
  getSavedKundlis,
  getKundliById,
  deleteKundli,
  getMatchmakingDetails,
} from "./kundliController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", generateKundli); // Could be protected or unprotected
router.post("/chat", chatWithAstrologyBot); // Could be protected or unprotected
router.post("/match", getMatchmakingDetails);

// Protect all routes below
router.use(protect);

router.route("/").get(getSavedKundlis);

router
  .route("/:id")
  .get(getKundliById)
  .delete(deleteKundli);

export default router;
