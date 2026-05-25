"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function StatCard({ label, value, helper, trend, icon: Icon, className }) {
    return (<motion.article whileHover={{ y: -10, opacity: 0.98 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className={cn("rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-indigo-50 backdrop-blur-xl", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{label}</p>
        <Icon className="h-4 w-4 text-gray-400"/>
      </div>
      <p className="mt-4 font-mono text-3xl text-gray-900">{value}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>{helper}</span>
        {trend && <span className="text-green-600">{trend}</span>}
      </div>
    </motion.article>);
}
