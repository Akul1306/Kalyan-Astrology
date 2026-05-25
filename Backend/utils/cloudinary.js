import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      // Use "auto" so Cloudinary can automatically detect if it's an image or a raw file (like PDF)
      resource_type: "auto", 
      folder: "Kalyan",
      use_filename: true,
      unique_filename: true,
    });

    // delete temp file (async)
    fs.unlink(localFilePath, (err) => {
      if (err) console.log("File delete error:", err);
    });

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };

  } catch (error) {
  console.log("Cloudinary Error:", error); // 👈 ADD THIS

  if (fs.existsSync(localFilePath)) {
    fs.unlink(localFilePath, () => {});
  }

  throw error; // 👈 send real error
}
};