import Test from "./testModel.js";
import TestResult from "./testResultModel.js";
import AppError from "../../utils/appError.js";

// @desc    Get all tests
// @route   GET /api/tests
export const getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.find();

    res.status(200).json({
      status: "success",
      results: tests.length,
      data: {
        tests,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit test answers and get score
// @route   POST /api/tests/:id/submit
export const submitTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return next(new AppError("No test found with that ID", 404));
    }

    const { answers } = req.body; // Expecting an array or map of questionId/index to user's answer
    
    if (!answers) {
       return next(new AppError("Please provide answers", 400));
    }

    let score = 0;
    
    // Evaluate answers
    test.questions.forEach((question, index) => {
      // Basic assumption: answers array order matches questions array order
      // You can refine this to match by question _id
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const testResult = await TestResult.create({
      user: req.user.id,
      test: test._id,
      score,
      totalQuestions: test.questions.length,
      answers,
    });

    res.status(201).json({
      status: "success",
      data: {
        testResult,
        score,
        totalQuestions: test.questions.length
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's past test scores
// @route   GET /api/tests/history
export const getTestHistory = async (req, res, next) => {
  try {
    const history = await TestResult.find({ user: req.user.id }).populate('test');

    res.status(200).json({
      status: "success",
      results: history.length,
      data: {
        history,
      },
    });
  } catch (err) {
    next(err);
  }
};
