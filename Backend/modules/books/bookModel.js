import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A book must have a title"],
      trim: true,
      unique: true,
      maxlength: [200, "A book title must have less or equal than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "A book must have a description"],
    },
    author: {
      type: String,
      required: [true, "A book must have an author"],
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL or local path
    },
    category: {
      type: String,
      required: [true, "A book must have a category"],
    },
    tags: [
      {
        type: String,
      },
    ],
    fileUrl: {
      type: String, // Cloudinary PDF URL
      required: [true, "A book must have an attached PDF file"],
    },
    isRagSupported: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
