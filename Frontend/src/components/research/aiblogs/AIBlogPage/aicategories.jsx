"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
const mono = "font-[family:'Geist_Mono','SFMono-Regular','Menlo','Roboto_Mono',monospace]";
const categories = [
    "AI in Astrology",
    "Vedic Science",
    "Company Updates",
    "Astro Algorithms",
    "Numerology ML Models",
    "Energy Mapping",
    "Spiritual Technology",
];
export default function AICategories() {
    return (<section aria-label="Blog categories" className="
        rounded-[24px]
        border border-black/10
        bg-white/60 backdrop-blur-xl
        shadow-[0_8px_50px_-20px_rgba(0,0,0,0.12)]
        p-6 sm:p-8
        relative overflow-hidden
      ">
      {/* Subtle AI pulse line */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1.4 }} className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/50 to-transparent"/>

      {/* Title */}
      <h2 className={`${mono} text-[1.1rem] tracking-tight font-medium text-black mb-6`}>
        Categories
      </h2>

      <nav>
        <ul className="space-y-3">
          {categories.map((category, index) => (<motion.li key={category} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05,
            }} viewport={{ once: true }}>
              <Link href={`/research/blogs?category=${encodeURIComponent(category.toLowerCase().replace(/\s+/g, "-"))}`} aria-label={`View posts in ${category}`} className={`
                  group flex items-center justify-between
                  py-2 px-1
                  cursor-pointer select-none
                  transition-all duration-200
                `}>
                {/* Label */}
                <span className={`${mono} text-[0.7rem] uppercase tracking-[0.25em] text-gray-600 group-hover:text-black transition-colors`}>
                  {category}
                </span>

                {/* Futuristic hover orb */}
                <motion.div className="w-2 h-2 rounded-full bg-black/10 group-hover:bg-black/70" whileHover={{ scale: 1.4 }} transition={{ duration: 0.2 }}/>
              </Link>

              {/* Magnetic underline animation */}
              <motion.div className="h-px w-full bg-black/10 origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{
                duration: 0.32,
                ease: "easeOut",
            }}/>
            </motion.li>))}
        </ul>
      </nav>
    </section>);
}
