"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKundliStore } from "@/lib/store";
import { BookOpen, Sparkles, Trophy, CheckCircle, AlertTriangle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const { token, isAuthenticated } = useKundliStore();
    const navigate = useNavigate();

    const [testId, setTestId] = useState(null);
    const [testTitle, setTestTitle] = useState("Vedic Astrology Quiz");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [current, setCurrent] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]); // Stores chosen string options
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Fetch Quiz questions from backend on mount
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch("/api/tests");
                if (!response.ok) {
                    throw new Error("Failed to fetch tests");
                }
                const data = await response.json();
                if (data.status === "success" && data.data?.tests?.length > 0) {
                    // Match the seeded Vedic Astrology Quiz
                    const targetTest = data.data.tests.find(t => t.title === "Vedic Astrology Quiz") || data.data.tests[0];
                    setTestId(targetTest._id);
                    setTestTitle(targetTest.title);
                    setQuestions(targetTest.questions || []);
                }
            } catch (error) {
                console.error("Error loading quiz questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, []);

    const activeQuestion = questions[current];

    const handleNext = async () => {
        if (!selectedOption) return;

        const updatedAnswers = [...userAnswers, selectedOption];
        setUserAnswers(updatedAnswers);

        // Check locally for score tracking
        if (selectedOption === activeQuestion.correctAnswer) {
            setScore((s) => s + 1);
        }

        setSelectedOption(null);

        if (current + 1 < questions.length) {
            setCurrent((c) => c + 1);
        } else {
            // Reached the end! Let's submit to backend if logged in
            if (isAuthenticated && testId) {
                setSubmitting(true);
                try {
                    const response = await fetch(`/api/tests/${testId}/submit`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ answers: updatedAnswers })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.status === "success") {
                            setScore(data.data.score);
                        }
                    }
                } catch (error) {
                    console.error("Error submitting test to server:", error);
                } finally {
                    setSubmitting(false);
                }
            }
            setCompleted(true);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-gray-500 font-mono text-sm tracking-wider">Accessing Celestial Academy...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-xl">
                <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Unavailable</h3>
                <p className="text-gray-600 mb-6">
                    We couldn't load the Vedic Astrology Quiz from the database. Please ensure your backend is running.
                </p>
            </div>
        );
    }

    return (<section className="py-20 w-full">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full font-mono">
            VedaLab Academy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins mt-3">
            {testTitle}
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Test your understanding of Jyotish fundamentals.
          </p>
        </motion.div>

        {/* Quiz Card */}
        <AnimatePresence mode="wait">
          {!completed ? (<motion.div key={activeQuestion._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="rounded-3xl bg-white border border-gray-100/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-8">
              <div className="mb-6 text-xs text-gray-400 font-mono flex items-center justify-between">
                <span>QUESTION {current + 1} OF {questions.length}</span>
                <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md font-bold uppercase">
                  ACTIVE BLOCK
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-6 font-poppins leading-snug">
                {activeQuestion.questionText}
              </h3>

              <div className="space-y-3">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      selectedOption === opt
                        ? "border-indigo-500 bg-indigo-50/50 text-indigo-600 shadow-sm"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50/30 text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedOption || submitting}
                onClick={handleNext}
                className="mt-8 w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-250 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                    Evaluating cosmic alignments...
                  </>
                ) : current + 1 === questions.length ? (
                  "Finish Quiz"
                ) : (
                  "Next Question"
                )}
              </button>
            </motion.div>) : (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center rounded-3xl bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-10 flex flex-col items-center">
              <div className="bg-gradient-to-tr from-amber-500 to-yellow-400 p-5 rounded-full shadow-lg text-white mb-6 animate-pulse">
                <Trophy className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-poppins">
                Quiz Completed! 🎉
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-sm">
                Congratulations on completing the baseline module! Your Jyotish score has been computed.
              </p>

              {/* Score Display */}
              <div className="bg-gray-50/80 border border-gray-100 rounded-3xl px-8 py-5 mb-8">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-mono">
                  Final Score
                </span>
                <span className="text-4xl font-black text-indigo-600 font-poppins block mt-1">
                  {score} / {questions.length}
                </span>
                <span className="text-xs font-semibold text-emerald-600 block mt-1.5">
                  ({Math.round((score / questions.length) * 100)}% Accuracy)
                </span>
              </div>

              {!isAuthenticated && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 max-w-md text-left">
                  <LogIn className="h-5 w-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700 font-medium leading-relaxed">
                    Note: Your score was not saved in MongoDB because you are not logged in. <strong>Log in to your account</strong> to save and review past scores!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setCurrent(0);
                    setSelectedOption(null);
                    setUserAnswers([]);
                    setScore(0);
                    setCompleted(false);
                  }}
                  className="px-8 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold transition-all cursor-pointer"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" /> Go to Profile History
                </button>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </section>);
};
export default Quiz;
