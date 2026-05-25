"use client";
import { motion } from "framer-motion";
import * as React from "react";
const EASE = [0.19, 1, 0.22, 1];
export default function Topic({ title, author, description, className }) {
    return (<motion.section itemScope itemType="https://schema.org/Article" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }} className={[
            "relative w-full rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-[2px]",
            "shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-5 sm:p-6",
            "dark:bg-neutral-900/70 dark:border-neutral-800",
            "font-mono text-[13px] leading-relaxed",
            className || "",
        ].join(" ")} aria-label="Paper topic">
      {/* Title */}
      <h1 itemProp="headline" className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>

      {/* Author */}
      <p className="mt-2 text-[13px] sm:text-[14px] text-neutral-600 dark:text-neutral-400">
        By{" "}
        <span itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name" className="font-semibold text-neutral-800 dark:text-neutral-200">
            {author}
          </span>
        </span>
      </p>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800"/>

      {/* Description */}
      <div className="mt-4 text-[13px] text-neutral-800/90 dark:text-neutral-200/90">
        {description}
      </div>

      {/* subtle top glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-2 -top-2 h-8 rounded-2xl bg-gradient-to-b from-white/60 to-transparent dark:from-neutral-900/50"/>
    </motion.section>);
}
