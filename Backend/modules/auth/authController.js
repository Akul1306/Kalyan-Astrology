import jwt from "jsonwebtoken";
import User from "./userModel.js";
import AppError from "../../utils/appError.js";
import { OAuth2Client } from "google-auth-library";

// Initialize client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      placeOfBirth: req.body.placeOfBirth,
      timeOfBirth: req.body.timeOfBirth,
      bio: req.body.bio,
      role: "user", // For public signup, force role to be user!
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { credentialToken } = req.body;
    if (!credentialToken) {
      return next(new AppError("Please provide a Google credential token!", 400));
    }

    // Verify Google ID Token
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: credentialToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (err) {
      return next(new AppError("Invalid Google credential token! " + err.message, 401));
    }

    if (!payload || !payload.email) {
      return next(new AppError("Could not retrieve email from Google!", 400));
    }

    const { sub: googleId, email, name, picture: avatar } = payload;

    // 1) Find user by googleId
    let user = await User.findOne({ googleId });

    if (!user) {
      // 2) Find user by email (traditional login existed, link Google Account)
      user = await User.findOne({ email });

      if (user) {
        // Link Google ID to existing account
        user.googleId = googleId;
        if (avatar && (user.avatar === "default.jpg" || !user.avatar)) {
          user.avatar = avatar;
        }
        await user.save({ validateBeforeSave: false }); // Skip validations for other empty fields on save
      } else {
        // 3) Create a new user since they don't exist
        user = await User.create({
          name,
          email,
          googleId,
          avatar: avatar || "default.jpg",
        });
      }
    }

    // Send MERN standard JWT
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const addAdmin = async (req, res, next) => {
  try {
    const newAdmin = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      placeOfBirth: req.body.placeOfBirth,
      timeOfBirth: req.body.timeOfBirth,
      bio: req.body.bio,
      role: "admin", // Explicitly create an admin
    });

    res.status(201).json({
      status: "success",
      message: "Admin registered successfully! 👑",
      data: {
        user: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
