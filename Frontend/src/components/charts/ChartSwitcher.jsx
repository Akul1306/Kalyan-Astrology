"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChartStyleToggle } from "./ChartStyleToggle";
import OptimizedImage from "@/components/common/OptimizedImage";
export function ChartSwitcher({ chart }) {
    const [chartStyle, setChartStyle] = useState("north");
    const chartType = chart?.chartType || "D1";
    const chartImages = {
        north: {
            src: "/North.png",
            alt: `${chartType} North Indian chart`,
        },
        south: {
            src: "/South.jpg",
            alt: `${chartType} South Indian chart`,
        },
    };
    return (<div className="mb-16">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 font-['Inter',system-ui,sans-serif]">
            Vedic Chart
          </h3>
          <p className="text-sm text-gray-500 font-['Inter',system-ui,sans-serif]">
            {chartStyle === "north" ? "North Indian Style" : "South Indian Style"}
          </p>
        </div>
        <ChartStyleToggle currentStyle={chartStyle} onToggle={setChartStyle}/>
      </div>

      {/* Animated Chart Container */}
      <div className="relative bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20 rounded-3xl border border-yellow-100/80 p-6 sm:p-12 shadow-[0_8px_32px_rgba(255,244,194,0.12)] min-h-[500px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={chartStyle} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="w-full flex justify-center">
            <OptimizedImage src={chartImages[chartStyle].src} alt={chartImages[chartStyle].alt} width={900} height={900} className="max-w-[520px] w-full rounded-2xl border border-yellow-100/80 shadow-[0_12px_45px_rgba(15,23,42,0.08)]" quality={90} priority={chartStyle === "north"}/>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-500 text-center mt-6 font-medium tracking-wide font-['Inter',system-ui,sans-serif]">
        {chartStyle === "north"
            ? "North Indian Style • Lahiri Ayanamsha"
            : "South Indian Style • Lahiri Ayanamsha"}
      </p>
    </div>);
}
