import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A test result must belong to a user"],
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: [true, "A test result must belong to a test"],
    },
    score: {
      type: Number,
      required: [true, "A test result must have a score"],
    },
    totalQuestions: {
      type: Number,
    },
    answers: {
      type: [String],
      required: [true, "A test result must record user answers"],
    },
  },
  {
    timestamps: true,
  }
);

const TestResult = mongoose.model("TestResult", testResultSchema);

export default TestResult;
