import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.googleId;
        },
        "Please provide a password",
      ],
      minlength: 8,
      select: false,
    },
    phone: {
      type: String,
    },
    placeOfBirth: {
      type: String,
      required: [
        function () {
          return !this.googleId;
        },
        "Please provide your place where you were born",
      ],
    },
    bio: {
      type: String,
    },
    timeOfBirth: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
      required: [
        function () {
          return !this.googleId;
        },
        "Please provide your time when you were born",
      ],
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    astrologyUserId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Method to check if password matches
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
