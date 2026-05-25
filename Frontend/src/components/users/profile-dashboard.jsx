"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Edit3, Star, Zap, Award, CheckCircle2, XCircle, ArrowRight, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { StatCard } from "@/components/cards/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileDashboard({ user, stats, history, testHistory = [], loadingHistory = false }) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null); // For Review Answers Modal
    const [formState, setFormState] = useState({
        name: user.name,
        email: user.email,
        location: user.location,
        bio: user.bio,
    });

    const dynamicStats = useMemo(() => {
        const base = [...stats];
        if (base[1]) {
            base[1].value = String(testHistory.length);
            if (testHistory.length > 0) {
                const latestScore = testHistory[0].score;
                const latestTotal = testHistory[0].totalQuestions || 10;
                base[1].helper = `Latest score: ${Math.round((latestScore / latestTotal) * 100)}%`;
            }
        }
        return base;
    }, [stats, testHistory]);

    const quickActions = useMemo(() => [
        {
            icon: Zap,
            label: "AI Snapshot",
            description: "Generate a quick AI summary of your current dasha pulse.",
            actionLabel: "Generate",
            onClick: () => setIsEditing(false),
        },
        {
            icon: Star,
            label: "Upgrade Kit",
            description: "Unlock premium rituals, mentors, and concierge charts.",
            actionLabel: "Explore",
        },
    ], []);

    const handleSave = () => {
        setIsEditing(false);
    };

    return (<>
      <DashboardShell title="Profile" description="Softly orchestrate your identity, rituals, and astrological signature." actions={<Button className="rounded-full bg-gray-900 px-5 text-white" onClick={() => setIsEditing(true)}>
            <Edit3 className="mr-2 h-4 w-4"/>
            Edit
          </Button>} rightPanel={<QuickActionsPanel actions={quickActions}/>}>
        
        {/* Profile Card */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-indigo-100 backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-white/60 bg-gray-100">
                <Image src={user.avatar || "/placeholder-user.jpg"} alt={user.name} fill sizes="120px" className="object-cover"/>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{user.memberSince}</p>
                <h2 className="font-mono text-2xl text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-wrap gap-3 md:justify-end">
              <Badge className="rounded-full bg-gray-900 text-white">
                {user.kundliBadge}
                <Star className="ml-2 h-3.5 w-3.5"/>
              </Badge>
              <Badge variant="outline" className="rounded-full border-gray-200 text-gray-700">
                {user.zodiac}
              </Badge>
              <Badge variant="outline" className="rounded-full border-gray-200 text-gray-700">
                {user.timezone}
              </Badge>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-base text-gray-600">{user.bio}</p>
        </motion.section>

        {/* Stats Section */}
        <div className="grid gap-5 md:grid-cols-3">
          {dynamicStats.map((stat, index) => {
            const iconPool = [Calendar, Award, Star];
            return (<StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} trend={stat.trend} icon={iconPool[index] ?? Calendar}/>);
          })}
        </div>

        {/* History Column Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Kundli History */}
          <Card className="rounded-3xl border-white/60 bg-white/80 shadow-xl shadow-indigo-50 flex flex-col h-[520px]">
            <CardContent className="space-y-6 p-6 flex flex-col h-full overflow-hidden">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Kundli History</p>
                <h3 className="mt-2 font-mono text-xl text-gray-900">Recent charts</h3>
              </div>

              <div className="space-y-4 overflow-y-auto flex-grow pr-1">
                {history.map((entry) => (<motion.div key={entry.id} whileHover={{ y: -4, opacity: 0.98 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{entry.title}</p>
                        <p className="text-xs text-gray-500">{entry.chartType}</p>
                      </div>
                      <Badge variant="outline" className={entry.status === "ready" ? "border-emerald-200 text-emerald-600" : "border-yellow-200 text-yellow-600"}>
                        {entry.status === "ready" ? "Ready" : "Processing"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{entry.generatedAt}</span>
                      <span>{entry.feeling}</span>
                    </div>
                  </motion.div>))}
              </div>
            </CardContent>
          </Card>

          {/* Astro Test results */}
          <Card className="rounded-3xl border-white/60 bg-white/80 shadow-xl shadow-indigo-50 flex flex-col h-[520px]">
            <CardContent className="space-y-6 p-6 flex flex-col h-full overflow-hidden">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Astro Test History</p>
                <h3 className="mt-2 font-mono text-xl text-gray-900">Recent assessments</h3>
              </div>

              <div className="space-y-4 overflow-y-auto flex-grow pr-1">
                {loadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-3"></div>
                    <p className="text-xs text-gray-400 font-mono">Loading history...</p>
                  </div>
                ) : testHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/30 p-6">
                    <Award className="h-10 w-10 text-gray-300 mb-3" />
                    <p className="text-sm font-bold text-gray-700">No tests completed yet</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
                      Complete tests in the study portal to keep track of your Jyotish knowledge and review your answers.
                    </p>
                  </div>
                ) : (
                  testHistory.map((result) => {
                    const dateFormatted = new Date(result.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });
                    const scorePercent = (result.score / (result.totalQuestions || 10)) * 100;
                    
                    return (
                      <motion.div 
                        key={result._id} 
                        whileHover={{ y: -4, opacity: 0.98 }} 
                        className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {result.test?.title || "Vedic Astrology Quiz"}
                            </p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{dateFormatted}</p>
                          </div>
                          <Badge 
                            className={`rounded-full ${
                              scorePercent >= 70 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" 
                                : scorePercent >= 50 
                                  ? "bg-amber-50 text-amber-700 border-amber-200/50" 
                                  : "bg-rose-50 text-rose-700 border-rose-200/50"
                            } text-xs font-bold border`}
                          >
                            Score: {result.score} / {result.totalQuestions || 10}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 mt-1">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">
                            {result.test?.focus || "Basics"}
                          </span>
                          <button
                            onClick={() => setSelectedResult(result)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                          >
                            Review Answers <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditing(false)}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/70 bg-white/95 p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <h3 className="font-mono text-xl text-gray-900">Edit profile</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Name</label>
                  <Input className="mt-1 rounded-2xl border-gray-200" value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}/>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Email</label>
                  <Input type="email" className="mt-1 rounded-2xl border-gray-200" value={formState.email} onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}/>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Location</label>
                  <Input className="mt-1 rounded-2xl border-gray-200" value={formState.location} onChange={(event) => setFormState((prev) => ({ ...prev, location: event.target.value }))}/>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Bio</label>
                  <Textarea rows={4} className="mt-1 rounded-2xl border-gray-200" value={formState.bio} onChange={(event) => setFormState((prev) => ({ ...prev, bio: event.target.value }))}/>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="rounded-full bg-gray-900 text-white">
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* Review Answers Overlay Modal */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100 font-poppins"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedResult(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all cursor-pointer z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 via-purple-50/20 to-transparent">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-500 font-mono">
                  Test Evaluation Report
                </p>
                <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                  {selectedResult.test?.title || "Vedic Astrology Quiz"}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <Badge className="bg-indigo-600 text-white rounded-md text-[11px] font-bold py-0.5 px-2">
                    Score: {selectedResult.score} / {selectedResult.totalQuestions || 10}
                  </Badge>
                  <span className="text-xs font-semibold text-gray-400 font-mono">
                    • Mapped: {selectedResult.test?.focus || "Basics"}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 font-mono">
                    • {new Date(selectedResult.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Modal Scrollable Questions Content */}
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                {(selectedResult.test?.questions || []).map((q, qIdx) => {
                  const userAnswer = selectedResult.answers?.[qIdx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div key={q._id || qIdx} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/30 flex flex-col gap-4">
                      {/* Question Prompt */}
                      <div className="flex items-start gap-2.5">
                        <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}>
                          {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </span>
                        <p className="text-sm font-bold text-gray-800 font-poppins leading-snug">
                          {q.questionText}
                        </p>
                      </div>

                      {/* Options Grid */}
                      <div className="grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt, oIdx) => {
                          const isUserChoice = userAnswer === opt;
                          const isRightChoice = q.correctAnswer === opt;
                          
                          let optStyle = "border-gray-200 bg-white text-gray-700";
                          if (isUserChoice) {
                            optStyle = isCorrect 
                              ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 font-bold" 
                              : "border-rose-500 bg-rose-50/50 text-rose-700 font-bold";
                          } else if (isRightChoice) {
                            optStyle = "border-emerald-300 bg-emerald-50/30 text-emerald-600 font-semibold";
                          }

                          return (
                            <div 
                              key={oIdx}
                              className={`px-4 py-3 rounded-xl border text-xs leading-relaxed flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {isUserChoice && (
                                <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md font-mono ${
                                  isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                                }`}>
                                  Your Choice
                                </span>
                              )}
                              {!isUserChoice && isRightChoice && (
                                <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md font-mono bg-emerald-500 text-white">
                                  Correct
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Close Evaluation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>);
}
