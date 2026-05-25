"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
/* Safe href utility */
const safeHref = (href) => {
    if (href && typeof href === "string" && href.trim().length > 0) {
        return href.trim();
    }
    return "#";
};
export default function KundliButton({ name, href, Icon, }) {
    const validHref = safeHref(href);
    return (<Link href={validHref} className="block w-full h-full" aria-label={name}>
      <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }} className="
          group relative aspect-square rounded-2xl
          w-full h-full cursor-pointer

          /* Glass morphism */
          bg-white/70 backdrop-blur-md
          border border-yellow-200/50
          shadow-[0_2px_10px_rgba(255,244,194,0.18)]
          hover:shadow-[0_6px_24px_rgba(255,244,194,0.30)]
          hover:bg-white/80
          transition-all duration-300

          flex flex-col items-center justify-center
          gap-2 p-3
        ">
        <Icon className="w-[20px] h-[20px] text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300"/>

        <span className="
            text-[15px] font-semibold text-gray-900
            tracking-wide text-center leading-tight
            group-hover:text-black
            transition-all duration-300
          ">
          {name}
        </span>
      </motion.div>
    </Link>);
}
