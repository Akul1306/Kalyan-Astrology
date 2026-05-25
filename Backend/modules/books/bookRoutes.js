import express from "express";
import { upload } from "../../utils/multer.js";
import {
  createBook,
  getAllBooks,
  deleteBook,
} from "./bookController.js";
import { protect, restrictTo } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBooks);

// Admin only routes (Protected)
router.post("/", protect, restrictTo("admin"), upload.single("file"), createBook);
router.delete("/:id", protect, restrictTo("admin"), deleteBook);

export default router;
