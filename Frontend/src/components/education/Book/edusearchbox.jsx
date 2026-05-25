"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const EduSearchBox = ({ placeholder = "Search your Book, Topic or Course...", onSearch, buttonText = "Start with AI", redirectTo = "/education/chat", enableRealtimeSearch = false, }) => {
    const [value, setValue] = useState("");
    const router = useRouter();
    // Debounced search effect
    useEffect(() => {
        if (!enableRealtimeSearch)
            return;
        const timer = setTimeout(() => {
            if (onSearch) {
                onSearch(value);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [value, onSearch, enableRealtimeSearch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = value.trim();
        if (!query)
            return;
        if (onSearch && !enableRealtimeSearch)
            onSearch(query);
        if (redirectTo) {
            router.push(`${redirectTo}?q=${encodeURIComponent(query)}`);
        }
    };
    return (<form onSubmit={handleSubmit} className="group relative mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-blue-200/60 bg-white/80 p-2 shadow-[0_10px_30px_rgba(59,130,246,0.15)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_16px_40px_rgba(59,130,246,0.25)]" role="search">
      {/* Left Icon */}
      <div className="ml-2 mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200 transition-all group-hover:bg-blue-100">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:rotate-6">
          <path d="M20.9 21.3a1 1 0 0 1-1.4 0l-3.4-3.4A7.94 7.94 0 0 1 4 10a8 8 0 1 1 14.6 4.1l3.4 3.4a1 1 0 0 1 0 1.4zM6 10a6 6 0 1 0 12 0A6 6 0 0 0 6 10z"/>
        </svg>
      </div>

      {/* Input */}
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="peer w-full flex-1 bg-transparent px-2 py-3 text-base text-gray-800 placeholder-gray-400 outline-none sm:text-lg" aria-label="Search field"/>

      {/* Animated Gradient Button */}
      <button type="submit" className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] sm:px-6 sm:py-3 sm:text-base">
        {/* Gradient Animation Layer */}
        <span className="absolute inset-0 bg-[length:200%_200%] animate-gradientMove from-blue-400 via-purple-500 to-pink-500 opacity-90"/>
        <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
          {/* ✨ Star Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-sm">
            <path d="M12 2l2.9 6.2L22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21l1.2-7-5-4.9 7.1-1.1L12 2z"/>
          </svg>
        </span>
        <span className="relative z-10">{buttonText}</span>
      </button>

      {/* Gradient Animation Keyframes */}
      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientMove {
          background: linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: gradientMove 5s ease infinite;
        }
      `}</style>
    </form>);
};
export default EduSearchBox;
