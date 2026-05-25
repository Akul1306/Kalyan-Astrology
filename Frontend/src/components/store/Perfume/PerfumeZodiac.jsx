"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
/* ---------------- DATA ---------------- */
const ZODIACS = [
    { id: "aries", title: "Aries", zodiacImg: "/Perfume/Zodiac/aries_card.webp", perfumeImg: "/Perfume/Zodiac/aries.webp", desc: "Aries — Bold fire, raw confidence, unstoppable drive." },
    { id: "taurus", title: "Taurus", zodiacImg: "/Perfume/Zodiac/taurus_card.webp", perfumeImg: "/Perfume/Zodiac/taurus.webp", desc: "Taurus — Earthy luxury, calm strength, sensual depth." },
    { id: "gemini", title: "Gemini", zodiacImg: "/Perfume/Zodiac/gemini_card.webp", perfumeImg: "/Perfume/Zodiac/gemini.webp", desc: "Gemini — Fresh curiosity, light citrus, playful air." },
    { id: "cancer", title: "Cancer", zodiacImg: "/Perfume/Zodiac/cancer_card.webp", perfumeImg: "/Perfume/Zodiac/cancer.webp", desc: "Cancer — Soft lunar warmth, emotional comfort." },
    { id: "leo", title: "Leo", zodiacImg: "/Perfume/Zodiac/leo_card.webp", perfumeImg: "/Perfume/Zodiac/leo.webp", desc: "Leo — Regal glow, golden pride, magnetic presence." },
    { id: "virgo", title: "Virgo", zodiacImg: "/Perfume/Zodiac/virgo_card.webp", perfumeImg: "/Perfume/Zodiac/virgo.webp", desc: "Virgo — Clean elegance, precision, subtle refinement." },
    { id: "libra", title: "Libra", zodiacImg: "/Perfume/Zodiac/libra_card.webp", perfumeImg: "/Perfume/Zodiac/libra.webp", desc: "Libra — Perfect balance, airy florals, harmony." },
    { id: "scorpio", title: "Scorpio", zodiacImg: "/Perfume/Zodiac/scorpio_card.webp", perfumeImg: "/Perfume/Zodiac/scorpio.webp", desc: "Scorpio — Dark intensity, mystery, magnetic depth." },
    { id: "sagittarius", title: "Sagittarius", zodiacImg: "/Perfume/Zodiac/sagittarius_card.webp", perfumeImg: "/Perfume/Zodiac/sagittarius.webp", desc: "Sagittarius — Wild freedom, spice, open horizons." },
    { id: "capricorn", title: "Capricorn", zodiacImg: "/Perfume/Zodiac/capricorn_card.webp", perfumeImg: "/Perfume/Zodiac/capricorn.webp", desc: "Capricorn — Authority, structure, timeless strength." },
    { id: "aquarius", title: "Aquarius", zodiacImg: "/Perfume/Zodiac/aquarius_card.webp", perfumeImg: "/Perfume/Zodiac/aquarius.webp", desc: "Aquarius — Electric originality, cool innovation." },
    { id: "pisces", title: "Pisces", zodiacImg: "/Perfume/Zodiac/pisces_card.webp", perfumeImg: "/Perfume/Zodiac/pisces.webp", desc: "Pisces — Dreamy waters, soft mysticism, intuition." },
];
/* ---------------- MOTION PRESETS ---------------- */
const buttonMotion = {
    whileHover: { scale: 1.06 },
    whileTap: { scale: 0.96 },
};
const cardMotion = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 0.95 },
    transition: { duration: 0.8, ease: [0.25, 1, 0.3, 1] },
};
/* ---------------- COMPONENT ---------------- */
const PerfumeZodiac = React.memo(function PerfumeZodiac() {
    const [selected, setSelected] = useState(ZODIACS[0].id);
    const [isLoaded, setIsLoaded] = useState(false);
    const zodiac = useMemo(() => ZODIACS.find((z) => z.id === selected), [selected]);
    useEffect(() => {
        setIsLoaded(false);
        const img = new window.Image();
        img.src = zodiac.perfumeImg;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
    }, [zodiac]);
    return (<section className="relative w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">

        {/* LEFT GRID */}
        <div className="lg:col-span-3">
          <div className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-6
              gap-x-12
              gap-y-14
              place-items-center
            ">
            {ZODIACS.map((z) => {
            const active = z.id === selected;
            return (<motion.button key={z.id} onClick={() => setSelected(z.id)} {...buttonMotion} transition={{ type: "spring", stiffness: 180, damping: 16 }} className={clsx(`
                      relative aspect-[2/3]
                      w-full max-w-[250px]
                      rounded-2xl overflow-hidden
                      transition-all focus:outline-none
                    `, active
                    ? "ring-2 ring-amber-400 shadow-xl scale-[1.05]"
                    : "hover:ring-1 hover:ring-amber-300/40 hover:shadow-md")}>
                  <Image src={z.zodiacImg} alt={z.title} fill sizes="(max-width:640px) 48vw, (max-width:1024px) 25vw, 170px" className="object-cover will-change-transform" style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                }} priority={active} loading={active ? "eager" : "lazy"}/>
                </motion.button>);
        })}
          </div>
        </div>

        {/* RIGHT DISPLAY */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={zodiac.id} {...cardMotion} className="
                relative w-full h-[58vh] rounded-3xl
                bg-white/50 backdrop-blur-xl
                border border-white/40
                shadow-[0_12px_50px_rgba(0,0,0,0.08)]
                flex items-center justify-center overflow-hidden
              ">
              <div className="relative w-[82%] h-full flex items-center justify-center">
                <Image src={zodiac.perfumeImg} alt={zodiac.title} fill className="object-contain will-change-transform" style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
        }} priority/>
              </div>

              {!isLoaded && (<div className="absolute inset-0 bg-white/60 animate-pulse flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    Blending your essence…
                  </span>
                </div>)}
            </motion.div>
          </AnimatePresence>

          <motion.p key={zodiac.desc} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-14 max-w-md text-center text-gray-700 italic text-sm sm:text-base leading-relaxed">
            {zodiac.desc}
          </motion.p>
        </div>
      </div>
    </section>);
});
export default PerfumeZodiac;
