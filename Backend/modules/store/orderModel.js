import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "An order must belong to a user"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Order item must have a product"],
        },
        quantity: {
          type: Number,
          required: [true, "Order item must have a quantity"],
          min: [1, "Quantity can not be less then 1."],
        },
        price: {
          type: Number,
          required: [true, "Order item must have a price"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "An order must have a total amount"],
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "captured", "failed"],
      default: "pending",
    },
    shippingAddress: {
      fullName: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
