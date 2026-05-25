// components/Features.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const defaultItems = [
    { title: "25 Years of Trust", subtitle: "100% Purity Guaranteed" },
    { title: "Worldwide Shipping", subtitle: "Free Delivery In India" },
    { title: "Certified Natural", subtitle: "Unheated & Untreated" },
    { title: "Energized & Activated", subtitle: "For Astrological Results" },
    { title: "Direct From Mines", subtitle: "Ethically Sourced" },
    { title: "Happy & Satisfied", subtitle: "100,000+ Customers" },
];
/** Simple neutral placeholder icon. Keep it small & semantic. */
function PlaceholderIcon({ size = 44 }) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
export default function Features({ items = defaultItems, className = "", animated = true, columns = 6, accentColor = "#B77634", // golden accent (used for icon & title)
iconSize = 44, gap = 24, }) {
    // clamp columns to a reasonable range
    const cols = Math.max(1, Math.min(6, columns));
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] } },
    };
    return (<section aria-label="Why choose us" className={`${poppins.className} w-full ${className}`}>
      <motion.div initial={animated ? "hidden" : undefined} whileInView={animated ? "show" : undefined} viewport={{ once: true, amount: 0.18 }} variants={containerVariants} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start" style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: gap,
        }}>
          {items.map((it, idx) => (<motion.button key={it.id ?? `${it.title}-${idx}`} role="figure" aria-label={it.ariaLabel ?? it.title} variants={itemVariants} whileHover={{ y: -6, scale: 1.01 }} onClick={it.onClick} className="flex flex-col items-center text-center gap-2 p-2 bg-transparent border-0 cursor-pointer" type="button">
              <div className="flex items-center justify-center rounded-full" style={{
                color: accentColor,
                width: iconSize + 8,
                height: iconSize + 8,
                minWidth: iconSize + 8,
            }}>
                {it.icon ?? <PlaceholderIcon size={iconSize}/>}
              </div>

              <h3 className="mt-1 text-[0.95rem] sm:text-sm font-semibold leading-tight" style={{ color: accentColor }}>
                {it.title}
              </h3>

              {it.subtitle && (<p className="mt-1 text-[0.82rem] text-neutral-500 leading-snug">
                  {it.subtitle}
                </p>)}
            </motion.button>))}
        </div>
      </motion.div>
    </section>);
}
