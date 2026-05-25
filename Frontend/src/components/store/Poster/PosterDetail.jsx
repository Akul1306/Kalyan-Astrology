// components/PosterDetail.tsx
"use client";
import React from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion";
const playfair = Playfair_Display({
    weight: ["600", "700"],
    subsets: ["latin"],
    display: "swap",
});
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});
const defaultSpecs = [
    { label: "Artist", value: "Unknown Artist / Custom Print" },
    { label: "Orientation", value: "Portrait" },
    { label: "Poster Sizes", value: "A3 / A2 / A1" },
    { label: "Finish", value: "Matte Premium" },
    { label: "Paper Type", value: "250 GSM • Museum Grade" },
    { label: "Print Quality", value: "Ultra HD • 300 DPI" },
    { label: "Framing Options", value: "Available" },
    { label: "Material", value: "High-Quality Art Paper" },
    { label: "Made In", value: "India" },
];
export default function PosterDetail({ specs = defaultSpecs, description = (<>
      This premium poster is printed using 300 DPI Ultra HD technology on
      museum-grade matte art paper. Designed for modern homes, studios, cafes,
      and minimal interiors — the colors stay vibrant for years without fading.
    </>), benefits = (<>
      This poster elevates your room vibe instantly — perfect for bedrooms,
      office decor, creative studios, or gifting. Long-lasting print quality,
      tear-resistant paper, and available in multiple size options.
    </>), badges = [
    "High Quality Print",
    "Museum Grade Paper",
    "Best for Home Decor",
    "Fade Resistant",
], className, }) {
    return (<section aria-label="Poster details" className={[
            "w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-10",
            className || "",
        ].join(" ")}>
      {/* BADGES */}
      {badges.length > 0 && (<div className="mb-6">
          <div className="w-full rounded-lg bg-neutral-50 py-3 px-4 flex flex-wrap gap-4 justify-center border border-neutral-200">
            {badges.map((b, i) => (<span key={b + i} className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-amber-700" style={{ fontFamily: inter.className }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect width="24" height="24" rx="6" fill="#10B981"/>
                  <path d="M7 13l3 3 7-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {b}
              </span>))}
          </div>
        </div>)}

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* LEFT PANEL — SPECS */}
        <motion.aside initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="lg:col-span-5">
          <div className="border border-neutral-200 rounded-lg p-6 bg-white" role="region">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {specs.map((s, idx) => (<div key={idx}>
                  <dt className="text-sm font-semibold text-amber-800 mb-1" style={{ fontFamily: playfair.className }}>
                    {s.label}
                  </dt>
                  <dd className="text-sm text-neutral-700" style={{ fontFamily: inter.className }}>
                    {s.value}
                  </dd>
                </div>))}
            </dl>

            {/* EXTRA ACTIONS */}
            <div className="mt-6 border-t pt-5 flex items-center gap-4">

              <button className="text-sm font-medium text-emerald-600 hover:underline" onClick={() => alert("View Certificate / Quality Check")}>
                Quality Check
              </button>

              <button className="text-sm font-medium text-blue-600 hover:underline" onClick={() => alert("Download Size Guide")}>
                Size Guide
              </button>

            </div>
          </div>
        </motion.aside>

        {/* RIGHT PANEL — DESCRIPTION */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} className="lg:col-span-7">
          <div className="bg-white p-6 rounded-lg">
            {/* DESCRIPTION */}
            <header className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-amber-800" style={{ fontFamily: playfair.className }}>
                ABOUT THIS POSTER
              </h3>
              <div className="text-sm text-neutral-700 leading-relaxed" style={{ fontFamily: inter.className }}>
                {description}
              </div>
            </header>

            <div className="border-t my-5"></div>

            {/* BENEFITS */}
            <h4 className="text-lg font-semibold mb-3 text-amber-800" style={{ fontFamily: playfair.className }}>
              WHY YOU’LL LOVE IT
            </h4>

            <div className="text-sm text-neutral-700 leading-relaxed mb-6" style={{ fontFamily: inter.className }}>
              {benefits}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-3 items-center">

              <button className="px-5 py-2 rounded-md bg-amber-700 text-white text-sm shadow-sm hover:shadow-md transition" onClick={() => alert("Add to cart")}>
                Add to Cart
              </button>

              <button className="px-5 py-2 rounded-md border border-amber-700 text-amber-700 text-sm hover:bg-amber-50 transition" onClick={() => alert("Buy Now")}>
                Buy Now
              </button>

              <button className="px-5 py-2 rounded-md border border-neutral-300 text-neutral-700 text-sm hover:bg-neutral-100 transition" onClick={() => alert("Customize Your Poster")}>
                Custom Poster
              </button>

              <button className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 text-sm hover:bg-blue-50 transition" onClick={() => alert("Preview in Your Room (AR)")}>
                AR Preview
              </button>

              <span className="ml-auto text-xs text-neutral-500" style={{ fontFamily: inter.className }}>
                <strong>Premium Print Quality</strong> • Fast Delivery • 10-Day Replacement
              </span>

            </div>
          </div>
        </motion.section>
      </div>
    </section>);
}
