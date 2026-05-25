"use client";
import { motion } from "framer-motion";
export function ChartSection({ title, children, delay = 0 }) {
    return (<motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay, ease: [0.19, 1, 0.22, 1] }} className="mb-16 sm:mb-20 will-change-transform-opacity">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 tracking-tight font-['Inter',system-ui,sans-serif]">
        {title}
      </h2>
      <div className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed font-['Inter',system-ui,sans-serif] space-y-4">
        {children}
      </div>
    </motion.section>);
}
