"use client";
import { motion } from "framer-motion";
export function ChartStyleToggle({ currentStyle, onToggle }) {
    return (<div className="flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-xl border border-yellow-100/60 shadow-[0_4px_16px_rgba(255,244,194,0.25)]">
      <motion.button onClick={() => onToggle("north")} className={`
          relative px-4 py-2 rounded-lg text-sm font-semibold
          transition-all duration-240 ease-out
          ${currentStyle === "north"
            ? "text-amber-900 bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-yellow-50/30"}
        `} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <span className="relative z-10">N</span>
        {currentStyle === "north" && (<motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-br from-yellow-100/80 to-yellow-50/60 rounded-lg border border-yellow-200/40" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>)}
      </motion.button>
      
      <motion.button onClick={() => onToggle("south")} className={`
          relative px-4 py-2 rounded-lg text-sm font-semibold
          transition-all duration-240 ease-out
          ${currentStyle === "south"
            ? "text-amber-900 bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-sm"
            : "text-gray-600 hover:text-gray-900 hover:bg-yellow-50/30"}
        `} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <span className="relative z-10">S</span>
        {currentStyle === "south" && (<motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-br from-yellow-100/80 to-yellow-50/60 rounded-lg border border-yellow-200/40" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>)}
      </motion.button>
    </div>);
}
