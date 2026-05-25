import express from "express";
import { getProfile, updateProfile } from "./userController.js";
import { protect } from "../../middleware/authMiddleware.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route("/profile")
  .get(getProfile)
  .put(upload.single("avatar"), updateProfile);

export default router;
