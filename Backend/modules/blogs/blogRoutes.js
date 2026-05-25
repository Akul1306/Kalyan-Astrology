import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "./blogController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBlogs)
  .post(protect, createBlog);

router
  .route("/:id")
  .get(getBlogById)
  .patch(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
