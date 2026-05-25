import express from "express";
import { upload } from "../../utils/multer.js";
import {
  createPaper,
  getAllPapers,
  getSavedPapers,
  toggleSavePaper,
  deletePaper,
} from "./paperController.js";
import { protect, restrictTo } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllPapers);

// Protected routes
router.use(protect);

router.get("/saved", getSavedPapers);
router.post("/:id/save", toggleSavePaper);

// Admin only routes
router.post("/", restrictTo("admin"), upload.single("file"), createPaper);
router.delete("/:id", restrictTo("admin"), deletePaper);

export default router;
