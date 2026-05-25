"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
/* -------------------------------- DATA -------------------------------- */
const ROADMAP = [
    {
        id: "foundation",
        label: "Foundation",
        subtitle: "Build the Astrological Base",
        gradient: "from-orange-400 via-amber-300 to-yellow-200",
        items: [
            { step: 1, title: "What is Vedic Astrology", description: "Jyotish as Vedanga, karma, destiny, time cycles & cosmic order." },
            { step: 2, title: "Zodiac Signs (Rashi)", description: "12 Rashis, elements, modalities & behavioral archetypes." },
            { step: 3, title: "Planets (Grahas)", description: "Sun to Saturn, Rahu–Ketu, significations & relationships." },
            { step: 4, title: "Houses (Bhavas)", description: "12 houses, Dharma–Artha–Kama–Moksha framework." },
            { step: 5, title: "Birth Chart Creation", description: "Lagna calculation, Moon chart & chart structure." },
        ],
    },
    {
        id: "analysis",
        label: "Analysis",
        subtitle: "Read the Chart Correctly",
        gradient: "from-sky-400 via-cyan-300 to-teal-200",
        items: [
            { step: 6, title: "Planetary Strengths (Shadbala)", description: "True planetary power evaluation." },
            { step: 7, title: "Aspects & Conjunctions", description: "Drishti logic & planetary interactions." },
            { step: 8, title: "Yogas & Doshas", description: "Raj Yoga, Dhana Yoga, Manglik & Kaal Sarp." },
            { step: 9, title: "Divisional Charts (Vargas)", description: "D1–D60, Navamsa & purpose-based charts." },
            { step: 10, title: "Nakshatra System", description: "27 Nakshatras, Pada logic & karmic layers." },
        ],
    },
    {
        id: "mastery",
        label: "Mastery",
        subtitle: "Predict, Guide & Heal",
        gradient: "from-violet-400 via-fuchsia-300 to-pink-200",
        items: [
            { step: 11, title: "Dasha Systems", description: "Vimshottari Dasha & predictive timing." },
            { step: 12, title: "Gochar (Transits)", description: "Saturn, Jupiter & Rahu–Ketu transits." },
            { step: 13, title: "Timing of Events", description: "Marriage, career, health & life events." },
            { step: 14, title: "Remedial Astrology", description: "Mantra, gemstones, donations & yantras." },
            { step: 15, title: "Ethics & Counseling", description: "Responsible predictions & guidance." },
            { step: 16, title: "Becoming a Jyotishi", description: "Practice, intuition & lifelong learning." },
        ],
    },
];
/* -------------------------------- ANIMATION -------------------------------- */
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};
const card = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};
/* -------------------------------- COMPONENT -------------------------------- */
const Roadmap = () => {
    return (<section className="relative py-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
          Vedic Astrology Roadmap
        </motion.h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          A structured, traditional yet modern path to mastering Jyotish.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-28">
        {ROADMAP.map((section) => (<motion.div key={section.id} variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid lg:grid-cols-3 gap-14 items-start">
            {/* Section Header */}
            <div className="lg:sticky lg:top-32">
              <div className={`w-56 h-56 rounded-full bg-gradient-to-br ${section.gradient} flex flex-col items-center justify-center shadow-xl`}>
                <h3 className="text-xl font-semibold text-gray-900">
                  {section.label}
                </h3>
                <p className="mt-1 text-xs text-gray-700 text-center px-4">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {section.items.map((item) => (<motion.div key={item.step} variants={card}>
                  <Link href="/education/test/Roadmap/Topic">
                    <div className="group cursor-pointer h-full rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                      <span className="text-xs font-medium text-gray-400">
                        Step {item.step}
                      </span>
                      <h4 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore →
                      </div>
                    </div>
                  </Link>
                </motion.div>))}
            </div>
          </motion.div>))}
      </div>
    </section>);
};
export default Roadmap;
