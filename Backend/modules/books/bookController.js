import Book from "./bookModel.js";
import AppError from "../../utils/appError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

// @desc    Create new book (Admin only)
// @route   POST /api/books
export const createBook = async (req, res, next) => {
  try {
    const { tags, category } = req.body;

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded. A book must have an attached file.",
      });
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    if (!cloudinaryResponse) {
      return res.status(500).json({
        status: "error",
        message: "Failed to upload file to Cloudinary.",
      });
    }

    let parsedTags = [];
    if (tags) {
      parsedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    }

    const newBook = await Book.create({
      ...req.body,
      tags: parsedTags,
      category,
      fileUrl: cloudinaryResponse.url,
      // Default placeholder image if none is provided
      image: req.body.image || "/books/placeholder.webp",
    });

    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all books
// @route   GET /api/books
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a book (Admin only)
// @route   DELETE /api/books/:id
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "No book found with that ID",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
