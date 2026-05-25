import Paper from "./paperModel.js";
import AppError from "../../utils/appError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

// @desc    Create new paper (Admin only)
// @route   POST /api/papers
export const createPaper = async (req, res, next) => {
  try {
    const { tags, category } = req.body;

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded. A research paper must have an attached file.",
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

    const newPaper = await Paper.create({
      ...req.body,
      tags: parsedTags,
      category,
      fileUrl: cloudinaryResponse.url,
    });

    res.status(201).json({
      status: "success",
      data: {
        paper: newPaper,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all papers
// @route   GET /api/papers
export const getAllPapers = async (req, res, next) => {
  try {
    const papers = await Paper.find();

    res.status(200).json({
      status: "success",
      results: papers.length,
      data: {
        papers,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get papers saved/bookmarked by user
// @route   GET /api/papers/saved
export const getSavedPapers = async (req, res, next) => {
  try {
    const papers = await Paper.find({ savedBy: req.user.id });

    res.status(200).json({
      status: "success",
      results: papers.length,
      data: {
        papers,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle save/bookmark status for a paper
// @route   POST /api/papers/:id/save
export const toggleSavePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return next(new AppError("No paper found with that ID", 404));
    }

    const isSaved = paper.savedBy.includes(req.user.id);

    if (isSaved) {
      // Remove from saved
      paper.savedBy = paper.savedBy.filter(id => id.toString() !== req.user.id.toString());
    } else {
      // Add to saved
      paper.savedBy.push(req.user.id);
    }

    await paper.save();

    res.status(200).json({
      status: "success",
      message: isSaved ? "Paper removed from saved list" : "Paper saved successfully",
      data: {
        paper,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a paper (Admin only)
// @route   DELETE /api/papers/:id
export const deletePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        status: "fail",
        message: "No paper found with that ID",
      });
    }

    await Paper.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
