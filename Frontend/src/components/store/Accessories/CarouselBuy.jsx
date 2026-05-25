"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
/* -------------------------------------------------------
   PREMIUM GLOW BUTTON
------------------------------------------------------- */
function GlowButton({ text }) {
    return (<button className="relative px-6 py-3 rounded-xl bg-black text-white text-sm md:text-base font-medium tracking-wide overflow-hidden shadow-xl">
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-purple-500/40 blur-xl opacity-40 animate-pulse"></span>
      <span className="relative">{text}</span>
    </button>);
}
/* -------------------------------------------------------
   MAIN SLIDER : ULTRA SMOOTH, ZERO FLICKER
------------------------------------------------------- */
export default function Workshop({ slides }) {
    const [current, setCurrent] = useState(0);
    const [ready, setReady] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    /* Preload first slide */
    useEffect(() => {
        const img = new window.Image();
        img.src = slides[0].image;
        img.onload = () => setReady(true);
    }, [slides]);
    /* Auto-rotation */
    useEffect(() => {
        if (!ready || slides.length < 2)
            return;
        const interval = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [ready, slides.length]);
    /* Preload next */
    useEffect(() => {
        const next = (current + 1) % slides.length;
        const img = new window.Image();
        img.src = slides[next].image;
    }, [current, slides]);
    if (!ready) {
        return (<div className="w-full h-[60vh] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"/>
      </div>);
    }
    const s = slides[current];
    /* -------------------------------------------------------
       RENDER
    ------------------------------------------------------- */
    return (<section className="w-full flex justify-center items-center py-10 px-4">
      <div className="relative w-full max-w-7xl h-[58vh] sm:h-[68vh] md:h-[78vh] lg:h-[85vh] 
      rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/30 backdrop-blur-2xl">

        {/* FULL IMAGE BACKDROP */}
        <motion.div key={s.image} initial={{ opacity: shouldReduceMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-0">
          <Image src={s.image} alt="Slide" fill priority quality={95} className="object-cover brightness-[0.88]"/>
        </motion.div>

        {/* OPTIONAL VIDEO */}
        {s.video && (<video src={s.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"/>)}

        {/* GLOW FRAME */}
        <motion.div className="absolute inset-0 rounded-3xl pointer-events-none" animate={{
            boxShadow: [
                "0 0 60px rgba(0,150,255,0.25)",
                "0 0 85px rgba(80,160,255,0.35)",
                "0 0 60px rgba(120,120,255,0.25)",
            ],
        }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}/>

        {/* TEXT STACK */}
        <div className="absolute left-0 bottom-0 p-8 max-w-xl text-white font-[Geist_Mono]">
          
          {/* TITLE */}
          {s.title && (<motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug drop-shadow-2xl">
              {s.title}
            </motion.h2>)}

          {/* SUBTITLE */}
          {s.subtitle && (<motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="text-base sm:text-lg md:text-xl text-white/90 mt-3 leading-relaxed drop-shadow-lg">
              {s.subtitle}
            </motion.p>)}

          {/* BUTTON */}
          {s.buttonText && (<motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }} className="mt-6">
              <Link href={s.buttonLink || "#"}>
                <GlowButton text={s.buttonText}/>
              </Link>
            </motion.div>)}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-white" : "bg-white/40"}`}/>))}
        </div>
      </div>
    </section>);
}
