"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
/**
 * GlowCard - Premium card component with soft yellow gradient glow
 * Features: Glass-like appearance, atmospheric shadows, smooth hover lift
 */
export function GlowCard({ children, className, glowIntensity = "medium", hover = true, delay = 0, }) {
    const glowVariants = {
        subtle: "shadow-[0_4px_24px_rgba(255,244,194,0.15)] hover:shadow-[0_8px_32px_rgba(255,244,194,0.25)]",
        medium: "shadow-[0_4px_24px_rgba(255,244,194,0.20)] hover:shadow-[0_8px_40px_rgba(255,244,194,0.35)]",
        strong: "shadow-[0_6px_32px_rgba(255,244,194,0.30)] hover:shadow-[0_12px_48px_rgba(255,244,194,0.50)]",
    };
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: [0.19, 1, 0.22, 1] }} whileHover={hover ? { y: -4, scale: 1.01 } : undefined} className={cn("relative rounded-lg bg-white/80 backdrop-blur-sm", "border border-yellow-200/40", glowVariants[glowIntensity], "transition-all duration-300 ease-out", className)}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-50/30 via-transparent to-transparent pointer-events-none"/>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>);
}
