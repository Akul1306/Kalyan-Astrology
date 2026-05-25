import multer from "multer";
import os from "os";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store in OS temporary directory
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept PDF files and Image files
  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Image files are allowed!"), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter 
});
