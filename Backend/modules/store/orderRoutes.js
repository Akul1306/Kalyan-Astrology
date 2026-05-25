import express from "express";
import { 
  createOrder, 
  getUserOrders, 
  createRazorpayOrder, 
  verifyRazorpayPayment 
} from "./orderController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(createOrder)
  .get(getUserOrders);

router.post("/checkout", createRazorpayOrder);
router.post("/verify", verifyRazorpayPayment);

export default router;
