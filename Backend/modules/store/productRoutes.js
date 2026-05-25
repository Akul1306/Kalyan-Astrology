import express from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct } from "./productController.js";
import { protect, restrictTo } from "../../middleware/authMiddleware.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin only routes
router.post("/", protect, restrictTo("admin"), upload.single("thumbnail"), createProduct);
router.delete("/:id", protect, restrictTo("admin"), deleteProduct);

export default router;
