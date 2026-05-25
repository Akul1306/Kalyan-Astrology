import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a test title"],
    },
    duration: {
      type: Number, // duration in minutes
    },
    focus: {
      type: String, // e.g., "Astrology basics", "Kundli reading"
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);

export default Test;
