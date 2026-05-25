"use client";
import React from "react";
import { motion } from "framer-motion";
export default function AstroProfileCard({ id, name, dob, tob, place, gender, rashi, nakshatra, lagna, createdAt, tags = [], onView, onEdit, }) {
    return (<motion.article initial={{ opacity: 0, y: 14, scale: 0.995 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: "easeOut" }} className="relative w-full max-w-sm rounded-2xl bg-white border border-yellow-100/60 p-5 shadow-sm">
      {/* Avatar - using local uploaded image path (transform to URL in your build) */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-yellow-50 ring-1 ring-yellow-100">
          {/* dev: local file path - your system will transform this path to a URL */}
          <img src="/mnt/data/f84134c0-8298-491e-8734-35d8f54d2d8b.png" alt={`${name} avatar`} className="h-full w-full object-cover"/>
        </div>

        <div className="flex-1">
          <h3 className="text-base font-mono font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{place}</p>
        </div>

        <time className="text-xs text-gray-400">{createdAt ? new Date(createdAt).toLocaleDateString() : ""}</time>
      </div>

      {/* Info rows */}
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <Row label="DOB" value={dob}/>
        <Row label="TOB" value={tob}/>
        <Row label="Rashi" value={rashi}/>
        <Row label="Nakshatra" value={nakshatra}/>
        <Row label="Lagna" value={lagna}/>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.length ? (tags.map((t) => (<span key={t} className="rounded-full px-3 py-1 text-xs bg-yellow-50 text-yellow-800 border border-yellow-100">
              {t}
            </span>))) : (<span className="text-xs text-gray-400">No tags</span>)}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button onClick={() => onView?.(id)} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 border border-yellow-100 shadow-sm hover:translate-y-[-2px] transition-transform">
          View
        </button>

        <button onClick={() => onEdit?.(id)} className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-white shadow hover:translate-y-[-2px] transition-transform">
          Edit
        </button>
      </div>
    </motion.article>);
}
function Row({ label, value }) {
    return (<div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="font-mono text-gray-700">{value}</span>
    </div>);
}
