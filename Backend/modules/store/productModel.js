import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    category: {
      type: String,
      enum: ["Perfume", "Gem", "Gemstone", "Poster", "Accessory"],
      required: [true, "A product must have a category"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    stock: {
      type: Number,
      required: [true, "A product must have a stock quantity"],
      default: 0,
    },
    thumbnail: {
      type: String, // Cloudinary URL
      required: [true, "A product must have a thumbnail image"],
    },
    deliveryEstimate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
