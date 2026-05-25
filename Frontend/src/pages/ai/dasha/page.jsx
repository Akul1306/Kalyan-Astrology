"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AIChatBot from "@/components/Chatbot/AIChatBot";
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay },
});
export default function AIDashaPage() {
    const [period, setPeriod] = useState("");
    const options = [
        "+/- 1 Day",
        "+/- 1 Week",
        "+/- 1 Month",
        "+/- 2 Months",
        "+/- 3 Months",
        "+/- 6 Months",
        "+/- 1 Year",
        "+/- 3 Year",
        "+/- 5 Year",
        "+/- 10 Year",
        "Full Life",
        "Age 1 to 35",
        "Age 10 to 35",
        "Age 25 to 50",
        "Age 35 to 60",
        "Age 60 to 85",
        "Age 50 to 100",
    ];
    return (<main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-12">
          {/* LEFT MAIN CONTENT */}
          <div className="space-y-10">
            {/* Title */}
            <motion.div {...fadeUp(0)}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-1">
                Predictions
              </p>
              <h1 className="text-3xl sm:text-[2.2rem] font-semibold text-gray-900 tracking-tight">
                AI Dasha Timeline
              </h1>
              <p className="mt-2 text-sm text-gray-500 max-w-xl">
                Choose a time window and view your Dasha flow as a clean, color-coded
                life map.
              </p>
            </motion.div>

            {/* Controls */}
            <motion.div {...fadeUp(0.05)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500">
                  Time period
                </label>

                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-full h-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-sm shadow-sm hover:bg-gray-100 transition">
                    <SelectValue placeholder="Select time range…"/>
                  </SelectTrigger>

                  {/* Scrollable dropdown with slim scrollbar */}
                  <SelectContent className="
                      rounded-xl bg-white shadow-xl border border-gray-200
                      max-h-72 overflow-y-auto overscroll-contain
                      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                    ">
                    {options.map((opt) => (<SelectItem key={opt} value={opt} className="cursor-pointer text-sm py-2.5 px-2 rounded-md hover:bg-gray-50">
                        {opt}
                      </SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <Button disabled={!period} className="
                  w-full h-11 rounded-xl bg-gray-900 text-white
                  text-xs font-semibold tracking-[0.18em] uppercase
                  hover:bg-black transition-all
                  shadow-md hover:shadow-xl disabled:opacity-60 disabled:shadow-none
                ">
                {period ? `Calculate for ${period}` : "Select a period to calculate"}
              </Button>
            </motion.div>

            {/* SVG Display */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="
                rounded-2xl border border-gray-200 bg-gray-50
                p-5 sm:p-6 shadow-sm
              ">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Dasha Map
                </p>
                {period && (<span className="text-[11px] text-gray-600">
                    Window: <span className="font-semibold text-gray-900">{period}</span>
                  </span>)}
              </div>

              <div className="relative flex justify-center">
                <img src="/showcase.svg" alt="Dasha SVG Output" className="w-full max-w-3xl h-auto drop-shadow-sm"/>
              </div>
            </motion.div>

            {/* EXPLANATION BLOCK */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 pt-8 border-t border-dashed border-gray-200 space-y-8 max-w-4xl">
              {/* Intro */}
              <p className="text-[13px] leading-relaxed text-gray-700">
                Your mind decodes{" "}
                <span className="text-green-600 font-semibold">
                  color
                </span>{" "}
                much faster than text. So instead of long paragraphs, we translate
                your Dasha into a simple visual rhythm you can read in seconds.
              </p>

              <img src="/life-predictor-image.jpg" alt="Dasha Chart" className="w-full rounded-xl shadow-sm border border-gray-200"/>

              <p className="text-[13px] leading-relaxed text-gray-700">
                <span className="text-red-600 font-semibold">RED</span> marks
                challenging phases.{" "}
                <span className="text-green-600 font-semibold">GREEN</span> marks
                supportive, growth-oriented periods. Even if you&apos;re new to
                astrology, you can scan your life curve at a glance.
              </p>

              {/* Perfect Predictions */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-gray-900 pl-3">
                  Perfect Predictions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"].map((src, i) => (<motion.img key={src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 * i }} src={src} alt="Perfect Predictions" className="w-full rounded-xl shadow-sm border border-gray-200"/>))}
                </div>
              </div>

              {/* Smart Summary */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-gray-900 pl-3">
                  Smart Summary
                </h2>

                <p className="text-[13px] leading-relaxed text-gray-700">
                  The{" "}
                  <span className="font-semibold text-gray-900">
                    Smart Summary
                  </span>{" "}
                  row shows how intense each event might be. Dark{" "}
                  <span className="text-red-600 font-semibold">RED</span> means a
                  stronger challenge. Lighter{" "}
                  <span className="text-green-600 font-semibold">GREEN</span>{" "}
                  indicates softer, supportive periods. Outcomes still depend on your
                  choices and karma.
                </p>

                <img src="/life-predictor-connection.jpg" alt="Smart Summary" className="w-full rounded-xl shadow-sm border border-gray-200"/>

                <p className="text-[13px] leading-relaxed text-gray-700">
                  During a{" "}
                  <span className="text-red-600 font-semibold">RED period</span>, it&apos;s
                  rare to feel completely settled inside. Something will keep nudging
                  you—maybe loud, maybe subtle. The chart&apos;s job is not to scare,
                  but to help you get ready.
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT CHATBOT COLUMN */}
          <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-20 h-fit">
            <AIChatBot />
          </aside>
        </div>
      </div>
    </main>);
}
