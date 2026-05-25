import express from "express";
import { register, login, googleLogin, addAdmin } from "./authController.js";
import { protect, restrictTo } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/add-admin", protect, restrictTo("admin"), addAdmin);

export default router;
