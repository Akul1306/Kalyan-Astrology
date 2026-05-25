import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      trim: true,
      maxlength: [100, "A blog title must have less or equal than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "A blog must have content"],
    },
    author: {
      type: String,
      // Default placeholder until user auth is integrated
      default: "Anonymous",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
