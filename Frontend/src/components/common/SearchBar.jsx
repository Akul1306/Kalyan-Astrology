"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
export const SearchBar = ({ placeholder = "Search...", onSearch, debounceMs = 300, className = "", }) => {
    const [query, setQuery] = useState("");
    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, debounceMs);
        return () => clearTimeout(timer);
    }, [query, onSearch, debounceMs]);
    return (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`group relative mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-blue-200/60 bg-white/80 p-2 shadow-[0_10px_30px_rgba(59,130,246,0.15)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_16px_40px_rgba(59,130,246,0.25)] ${className}`}>
      {/* Search Icon */}
      <div className="ml-2 mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200 transition-all group-hover:bg-blue-100">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:rotate-6">
          <path d="M20.9 21.3a1 1 0 0 1-1.4 0l-3.4-3.4A7.94 7.94 0 0 1 4 10a8 8 0 1 1 14.6 4.1l3.4 3.4a1 1 0 0 1 0 1.4zM6 10a6 6 0 1 0 12 0A6 6 0 0 0 6 10z"/>
        </svg>
      </div>

      {/* Input */}
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="peer w-full flex-1 bg-transparent px-2 py-3 text-base text-gray-800 placeholder-gray-400 outline-none sm:text-lg" aria-label="Search field"/>

      {/* Clear Button */}
      {query && (<motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => setQuery("")} className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-700" aria-label="Clear search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </motion.button>)}
    </motion.div>);
};
export default SearchBar;
