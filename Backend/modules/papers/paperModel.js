import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A research paper must have a title"],
      trim: true,
      maxlength: [200, "A research paper title must have less or equal than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "A research paper must have a description"],
    },
    author: {
      type: String,
      required: [true, "A research paper must have an author"],
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    preview: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Research", "Assessment", "Notes"],
      required: [true, "A research paper must have a category"],
    },
    tags: [
      {
        type: String,
      },
    ],
    fileUrl: {
      type: String, // Cloudinary PDF URL
      required: [true, "A research paper must have an attached file"],
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Paper = mongoose.model("Paper", paperSchema);

export default Paper;
