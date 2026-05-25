"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Sun, Share2, Download, Printer, } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
/* 🕒 Convert 24h → 12h (AM/PM) safely */
function formatTime(time) {
    if (!time || typeof time !== "string")
        return "N/A";
    try {
        const [h, m] = time.split(":");
        const hour = parseInt(h, 10);
        const minute = parseInt(m, 10);
        if (isNaN(hour) || isNaN(minute))
            return time;
        const ampm = hour >= 12 ? "PM" : "AM";
        const adjustedHour = hour % 12 || 12;
        return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    }
    catch {
        return time;
    }
}
export function KundliProfile({ name, dateOfBirth, timeOfBirth, placeOfBirth, lagna, }) {
    const formattedTime = formatTime(timeOfBirth);
    return (<GlowCard glowIntensity="medium" className="
        w-full max-w-3xl mx-auto rounded-3xl bg-white 
        border border-yellow-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]
        p-6 select-none
      ">
      {/* Top Section */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }} className="flex items-start justify-between">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <motion.div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center shadow-sm" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200 }}>
            <User className="w-6 h-6 text-yellow-700"/>
          </motion.div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
            <p className="text-xs text-gray-500 tracking-wide">Birth Details</p>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div className="flex gap-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          {[
            { icon: Printer, label: "Print" },
            { icon: Download, label: "Save" },
            { icon: Share2, label: "Share" },
        ].map(({ icon: Icon, label }, i) => (<motion.button key={label} title={label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05 }} className="
                p-2.5 rounded-xl bg-gray-50 border border-gray-200 
                hover:bg-gray-100 shadow-sm transition
              ">
              <Icon className="w-4 h-4 text-gray-700"/>
            </motion.button>))}
        </motion.div>
      </motion.div>

      {/* Info Section */}
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Date */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="
              flex items-center gap-3 bg-gray-50/80 border border-gray-100 
              rounded-xl px-4 py-3 text-sm text-gray-700
            ">
            <Calendar className="w-4 h-4 text-yellow-600"/>
            <span className="font-medium">{dateOfBirth}</span>
          </motion.div>

          {/* Time */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="
              flex items-center gap-3 bg-gray-50/80 border border-gray-100 
              rounded-xl px-4 py-3 text-sm text-gray-700
            ">
            <Clock className="w-4 h-4 text-yellow-600"/>
            <span className="font-medium">{formattedTime}</span>
          </motion.div>
        </div>

        {/* Place */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="
            flex items-center gap-3 bg-gray-50/80 border border-gray-100 
            rounded-xl px-4 py-3 text-sm text-gray-700
          ">
          <MapPin className="w-4 h-4 text-yellow-600"/>
          <span className="font-medium">{placeOfBirth}</span>
        </motion.div>

        {/* Lagna */}
        {lagna && (<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="
              flex items-center gap-3 bg-yellow-50 border border-yellow-200 
              rounded-xl px-4 py-3 text-sm text-gray-900 shadow-sm
            ">
            <Sun className="w-4 h-4 text-yellow-700"/>
            <span className="font-semibold">Lagna / Ascendant: {lagna}</span>
          </motion.div>)}
      </div>
    </GlowCard>);
}
