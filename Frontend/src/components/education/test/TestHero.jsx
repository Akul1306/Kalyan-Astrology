"use client";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Orb from "@/components/ui/bits/orb";
export default function TestHero() {
    // Loose typing because Orb is an external component with optional imperative API
    const orbRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const handleHover = useCallback((state) => {
        setHovered(state);
        orbRef.current?.setHoverState?.(state);
    }, []);
    useEffect(() => {
        if (!orbRef.current)
            return;
        const intensity = hovered ? 1.2 : 0.5;
        orbRef.current.setIntensity?.(intensity);
    }, [hovered]);
    return (<section className="text-black font-[Inter] relative isolate flex min-h-[90vh] w-full items-center justify-center overflow-hidden z-10 px-6 py-16 sm:py-20" aria-label="AI-Powered Astrology Test">
      {/* Orb layer (decorative, behind content) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden="true">
        <Orb hoverIntensity={0.8} rotateOnHover hue={220} forceHoverState={hovered}/>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-3xl select-none text-center">
        {/* Tag */}
        <motion.div className="mb-6 inline-flex rounded-full border border-gray-200 bg-white/70 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          🌞 AI-Powered Astrology Test
        </motion.div>

        {/* Heading */}
        <motion.h1 className="mx-auto max-w-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onFocus={() => handleHover(true)} onBlur={() => handleHover(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          Unlock Your Cosmic Intelligence
        </motion.h1>

        {/* Subtext */}
        <motion.p className="mx-auto mt-4 max-w-md text-balance text-base text-gray-600 sm:text-lg" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onFocus={() => handleHover(true)} onBlur={() => handleHover(false)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          Your personalized AI astrology test reveals celestial patterns that
          shape your destiny. Hover or focus on the text and feel the orb
          respond ✨
        </motion.p>

        {/* Buttons */}
        <motion.div className="mt-8 flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
          <button onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onFocus={() => handleHover(true)} onBlur={() => handleHover(false)} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-400 px-8 py-3 font-semibold text-white shadow-md outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-fuchsia-300">
            Get Started
          </button>
          <button onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} onFocus={() => handleHover(true)} onBlur={() => handleHover(false)} className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 shadow-sm outline-none transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-sky-300">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>);
}
