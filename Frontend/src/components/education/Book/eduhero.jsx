"use client";
import React from "react";
import EduSearchBox from "./edusearchbox";
import Image from "next/image";
const EduHeroSection = ({ onSearchChange }) => {
    const handleSearchSubmit = (value) => {
        if (process.env.NODE_ENV === "development") {
            console.log("Search value:", value);
        }
        if (onSearchChange) {
            onSearchChange(value);
        }
    };
    return (<section className="relative mx-auto w-[95%] overflow-hidden rounded-b-[25px] bg-gradient-to-b from-white via-blue-100 to-blue-200 py-20 sm:py-28 shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)]" 
    // eslint-disable-next-line react/forbid-dom-props
    style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
        }}>
  
      {/* Grid lines background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-b-[25px] bg-[linear-gradient(to_right,rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:24px_24px]"/>

      {/* Inverted fade (downward) gradient overlay */}
      <div aria-hidden className="absolute inset-0 rounded-b-[25px] bg-gradient-to-t from-blue-100 via-white/40 to-transparent"/>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Foundation badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm shadow-sm">
          <a href="https://paravidyafoundation.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Image src="/Logo/ParavidyaFoundation.png" alt="ParaVidya Foundation" width={20} height={20} className="object-contain"/>
            <span>Backed by ParaVidya Foundation</span>
          </a>
        </div>

        {/* Hero Titles */}
        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Live Q & A Session with
        </h1>
        <h2 className="mt-1 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Top Astrology Books
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
          Chat With Your Favorite Books And Ask Your Questions
        </p>

        {/* Search box */}
        <div className="mx-auto mt-10 max-w-2xl">
          <EduSearchBox onSearch={handleSearchSubmit} enableRealtimeSearch={true} redirectTo={undefined}/>
        </div>
      </div>
    </section>);
};
export default EduHeroSection;
