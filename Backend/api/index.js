import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

// Load environment variables
dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MongoDBURL);
    isConnected = true;
    console.log("Connected to MongoDB successfully via Serverless function");
  } catch (err) {
    console.error("Database connection error in Serverless context:", err);
    throw err;
  }
};

export default async function handler(req, res) {
  // Ensure DB connection is warm before processing request
  await connectDB();
  
  // Forward handling to the Express application
  return app(req, res);
}
