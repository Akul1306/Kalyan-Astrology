import express from "express";
import {
  getAllTests,
  submitTest,
  getTestHistory,
} from "./testController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTests);

router.use(protect);

router.get("/history", getTestHistory);
router.post("/:id/submit", submitTest);

export default router;
