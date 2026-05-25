"use client";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
export function TestCard({ title, duration, status, score, focus, onStart }) {
    const statusLabel = status === "completed" ? `Completed · ${score}%` : status === "in-progress" ? "Resume" : "Fresh";
    return (<motion.div whileHover={{ y: -10, opacity: 0.98 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-indigo-50 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{duration}</p>
          <h3 className="mt-2 font-mono text-lg text-gray-900">{title}</h3>
        </div>
        <span className="rounded-full bg-gray-900/5 px-3 py-1 text-xs font-medium text-gray-600">{statusLabel}</span>
      </div>
      <p className="mt-3 text-sm text-gray-500">{focus}</p>

      <Button className="mt-5 w-full rounded-full bg-gray-900 text-white shadow" onClick={onStart} variant="default">
        <Play className="mr-2 h-4 w-4"/>
        {status === "completed" ? "Retake" : "Start"}
      </Button>

      <button onClick={onStart} className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-semibold text-gray-500">
        Detail flow
        <ChevronRight className="h-4 w-4"/>
      </button>
    </motion.div>);
}
