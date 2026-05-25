import User from "./userModel.js";
import AppError from "../../utils/appError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("No user found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // 1) Create error if user POSTs password data
    if (req.body.password) {
      return next(
        new AppError(
          "This route is not for password updates. Please use correct route.",
          400
        )
      );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      bio: req.body.bio,
      timezone: req.body.timezone,
      zodiac: req.body.zodiac,
      placeOfBirth: req.body.placeOfBirth,
      timeOfBirth: req.body.timeOfBirth,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    // Handle avatar upload if file exists
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        updateData.avatar = cloudinaryResponse.url;
      }
    }

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
