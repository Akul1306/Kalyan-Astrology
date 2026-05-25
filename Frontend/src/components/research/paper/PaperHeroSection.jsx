"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import EduSearchBox from "../../education/Book/edusearchbox";
import { ResearchTopics } from "./researchtopics";
export const PaperHeroSection = ({ onSearchChange, onTopicSelect, selectedTopic, }) => {
    const [searchKey, setSearchKey] = useState(0);
    const handleSearch = (val) => {
        if (onSearchChange) {
            onSearchChange(val);
        }
    };
    const handleTopicClick = (topic) => {
        // Force re-render of search box by changing key
        setSearchKey(prev => prev + 1);
        if (onTopicSelect) {
            onTopicSelect(topic);
        }
    };
    return (<section className="relative flex flex-col items-center justify-center px-4 pt-18 pb-20 text-center sm:pt-36 overflow-hidden">
      
      {/* Announcement Badge */}
      <motion.div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm shadow-sm">
          <a href="https://paravidyafoundation.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Image src="/Logo/ParavidyaFoundation.png" alt="ParaVidya Foundation" width={20} height={20} className="object-contain"/>
            <span>Backed by ParaVidya Foundation</span>
          </a>
        </motion.div>

      {/* Hero Heading */}
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
        World's Largest <br />
        <span className="relative inline-block">
          <span className="relative z-10 rounded-sm bg-yellow-300 px-2 py-0.5">
            Astrology Research Paper
          </span>
        </span>
        <br />
        Collection
      </motion.h1>

      {/* Search Bar */}
      <motion.div key={`search-${searchKey}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-10 w-full max-w-2xl">
        <EduSearchBox placeholder="Search Your Topic" onSearch={handleSearch} enableRealtimeSearch={true} redirectTo={undefined}/>
      </motion.div>

      {/* Topics */}
      <ResearchTopics onTopicClick={handleTopicClick} selectedTopic={selectedTopic}/>

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_70%)]"></div>
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/memphis-mini.png')] opacity-10"></div>
    </section>);
};
