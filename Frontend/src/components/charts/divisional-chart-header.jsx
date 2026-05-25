"use client";
import { motion } from "framer-motion";
export function DivisionalChartHeader({ title, subtitle }) {
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="mb-12 sm:mb-16 will-change-transform-opacity">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight font-['Inter',system-ui,sans-serif] leading-tight">
        {title}
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed font-['Inter',system-ui,sans-serif]">
        {subtitle}
      </p>
    </motion.div>);
}
