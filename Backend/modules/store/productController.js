import Product from "./productModel.js";
import AppError from "../../utils/appError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

// @desc    Get all products
// @route   GET /api/products
export const getAllProducts = async (req, res, next) => {
  try {
    // Simple filtering by category if provided in query string
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter);

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product (Admin only)
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, stock, deliveryEstimate } = req.body;

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded. A product must have a thumbnail image.",
      });
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    if (!cloudinaryResponse) {
      return res.status(500).json({
        status: "error",
        message: "Failed to upload image to Cloudinary.",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock || 0),
      deliveryEstimate: deliveryEstimate || "3-5 days",
      thumbnail: cloudinaryResponse.url,
    });

    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "No product found with that ID",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

