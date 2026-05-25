"use client";
import { motion } from "framer-motion";

const rows = [
    {
        name: "Graha Maitram",
        desc: "happiness, mental compatibility",
        result: "Bad",
        notes: "No good connection between these horoscopes • male: SamePlanet Sign, female: SamePlanet Sign",
    },
    {
        name: "Rajju",
        desc: "strength/duration of married life",
        result: "Bad",
        notes: "Sira (head) husband’s death is likely • male: Sira, female: Sira",
    },
    {
        name: "Nadi Kuta",
        desc: "nervous energy compatibility",
        result: "Neutral",
        notes: "Bad but neutralized by friendly Janma Rasi lord • male: Pitha, female: Pitha",
    },
    {
        name: "Vasya Kuta",
        desc: "degree of magnetic control",
        result: "Bad",
        notes: "Neither controls the other • male: Aquarius, female: Aquarius",
    },
    {
        name: "Dina Kuta",
        desc: "day to day living",
        result: "Bad",
        notes: "Remainder is 1 • male: Aquarius, female: Aquarius",
    },
    {
        name: "Guna Kuta",
        desc: "temperament & character",
        result: "Good",
        notes: "Both are same Rakshasa Demon Guna • male: Rakshasa, female: Rakshasa",
    },
    {
        name: "Mahendra",
        desc: "well-being & longevity",
        result: "Bad",
        notes: "No well-being and no longevity, count 1 • male: Dhanishta-3, female: Dhanishta-3",
    },
    {
        name: "Stree Deergha",
        desc: "husband wellbeing, prosperity",
        result: "Bad",
        notes: "Constellation count lower than 9, it is 1 • male: Dhanishta-3, female: Dhanishta-3",
    },
    {
        name: "Rasi Kuta",
        desc: "rasi compatibility",
        result: "Neutral",
        notes: "Bad but neutralized by friendly Janma Rasi lord • male: Aquarius, female: Aquarius",
    },
    {
        name: "Vedha",
        desc: "birth constellation harmony",
        result: "Good",
        notes: "Constellation pair not hostile • male: Dhanishta, female: Dhanishta",
    },
    {
        name: "Varna",
        desc: "spiritual/ego compatibility",
        result: "Good",
        notes: "Boy higher and girl lower or both same Varna • male: Vaisya Workmen, female: Vaisya Workmen",
    },
    {
        name: "Yoni Kuta",
        desc: "sex compatibility",
        result: "Good",
        notes: "Not perfect, better than normal • male: Lion, female: Lion",
    },
    {
        name: "Kuja Dosa",
        desc: "Mars dosha risk",
        result: "Bad",
        notes: "Charts cannot be matched, female chart has more dosha • male: 0, female: 137.5",
    },
    {
        name: "Bad Constellation",
        desc: "checks evil constellation",
        result: "Good",
        notes: "No evil constellation in either person",
    },
    {
        name: "Sex Energy",
        desc: "planets in 7th house",
        result: "Neutral",
        notes: "No evil or good, neutral result",
    },
    {
        name: "Partners Death",
        desc: "malefic in 2nd/7th houses",
        result: "Neutral",
        notes: "No matching 2nd+7th malefic affliction",
    },
    {
        name: "Planetary Trine Harmony",
        desc: "Venus, Mars, Jupiter trine",
        result: "Bad",
        notes: "Unfavourable: no trikona alignment between Venus/Mars/Jupiter",
    },
    {
        name: "Sun Moon Harmony",
        desc: "Sun-Sun & Moon-Moon harmony",
        result: "Good",
        notes: "Strong attachment; Sun and Moon are in harmonious positions",
    },
    {
        name: "Mars Seventh No Benefic",
        desc: "Mars in 7th without benefic aspects",
        result: "Neutral",
        notes: "No un-aspected Mars in the 7th detected",
    },
    {
        name: "Sun Moon Mars Venus Twelve",
        desc: "Mars-Venus 12th linkage",
        result: "Empty",
        notes: "No linkage found",
    },
    {
        name: "Venus Saturn Connection",
        desc: "inter-synastry of Venus & Saturn",
        result: "Neutral",
        notes: "No overlap of Venus with the other’s Saturn sign",
    },
    {
        name: "Saturn Seventh Stability",
        desc: "stability vs coldness",
        result: "Neutral",
        notes: "No Saturn in the 7th detected",
    },
    {
        name: "Malefic In Fourth",
        desc: "Strong malefic in 4th",
        result: "Neutral",
        notes: "No un-neutralized malefic in 4th found",
    },
    {
        name: "Saturn Eighth Aspected By Mars",
        desc: "Saturn in 8th aspected by Mars",
        result: "Neutral",
        notes: "No Saturn-in-8th with 4th/8th Mars aspect detected",
    },
];

const palette = {
    Good: {
        text: "text-emerald-600",
        bg: "bg-emerald-50 border-emerald-200",
    },
    Neutral: {
        text: "text-[#6B7280]",
        bg: "bg-[#F9FAFB] border-[#E5E7EB]",
    },
    Bad: {
        text: "text-[#FF4D67]",
        bg: "bg-red-50 border-red-200",
    },
    Empty: {
        text: "text-[#6B7280]",
        bg: "bg-white border-gray-200",
    },
};

export default function MatchTable({ rows: customRows }) {
    const displayRows = customRows || rows;
    return (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-5xl mx-auto p-8 rounded-[32px] bg-[#FFFFFF] 
      shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#E5E7EB] font-[IBM Plex Mono]">
      
      {/* Header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-[#FF4D67]/10 via-white to-[#B388FF]/10 border border-[#F1F5F9] shadow-inner">
        <p className="text-[12px] uppercase tracking-[0.35em] text-[#6B7280]">
          Match Report
        </p>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight mt-1">
          Kuta Compatibility Matrix
        </h2>
        <p className="text-sm mt-1 text-[#6B7280]">
          A synthesis of emotional, physical, spiritual & karmic indicators.
        </p>
      </div>

      {/* Table */}
      <div className="mt-8 rounded-3xl border border-gray-100 bg-white divide-y divide-gray-100">
        {displayRows.map((item, idx) => {
            const c = palette[item.result] || palette.Neutral;
            return (<motion.div key={item.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{
                    duration: 0.4,
                    delay: idx * 0.03,
                    ease: [0.25, 1, 0.5, 1],
                }} className="grid gap-4 px-6 py-5 md:grid-cols-[240px_120px_1fr] 
              hover:bg-[#F9FAFB] transition-colors duration-200">
              
              {/* Name + desc */}
              <div>
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  {item.name}
                </p>
                <p className="text-[12px] text-[#6B7280]">{item.desc}</p>
              </div>

              {/* Badge */}
              <div className="flex items-center">
                <span className={`px-4 py-1.5 text-[11px] font-semibold rounded-full border ${c.bg} ${c.text}`}>
                  {item.result}
                </span>
              </div>

              {/* Notes */}
              <p className="text-[13px] leading-relaxed text-[#6B7280]">
                {item.notes}
              </p>
            </motion.div>);
        })}
      </div>
    </motion.div>);
}
