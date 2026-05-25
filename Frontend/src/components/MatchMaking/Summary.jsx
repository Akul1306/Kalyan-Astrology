"use client";
import { Heart } from "lucide-react";
export default function CoupleScore({ name1, name2, summary, score }) {
    return (<div className="w-full max-w-5xl mx-auto rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] 
    p-8 border border-gray-100 flex flex-col gap-6 font-[IBM Plex Mono]">
      
      <div className="w-full flex flex-col items-center gap-1">
        <span className="text-[12px] tracking-[0.2em] text-gray-500 font-semibold uppercase">
          Couple
        </span>

        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <span>{name1}</span>
          <Heart className="text-red-500 h-5 w-5 fill-red-500"/>
          <span>{name2}</span>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full"/>

      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold">
            Score
          </span>
          <span className="text-5xl font-bold text-green-600">{score}%</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold flex items-center gap-1">
            ✨ AI Summary
          </span>
          <span className="text-[15px] text-gray-700 font-medium leading-snug max-w-[220px] text-right">
            {summary}
          </span>
        </div>
      </div>
    </div>);
}
