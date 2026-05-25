"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";
const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
    display: "swap",
});
export default function BlogHero() {
    return (<section className="relative flex flex-col justify-center sm:py-16 overflow-hidden" aria-label="Blog hero section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className={`${playfairDisplay.variable} font-playfair text-center mb-4 animate-fade-in-up-delay-1`}>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight">
            Learn from the{" "}
            <span className="text-[#A0522D] italic font-semibold">
              Best & Authentic Blogs
            </span>
          </span>
        </h1>

        {/* Sub-heading */}
        <h2 className={`${playfairDisplay.variable} font-playfair text-center mb-10 sm:mb-14 md:mb-16 animate-fade-in-up-delay-2`}>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900 leading-tight">
            Verified by{" "}
            <span className="text-[#A0522D] italic font-semibold">
              Astrologer
            </span>
          </span>
        </h2>

        {/* Body Paragraph */}
        <p className="mx-auto max-w-2xl text-center text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up-delay-3">
          Explore our extensive collection of authentic astrological wisdom, ancient remedies, and celestial insights. Learn how cosmic energy, planetary transits, and customized dosha alignments shape your path to success and harmony.
        </p>
      </div>
    </section>);
}
