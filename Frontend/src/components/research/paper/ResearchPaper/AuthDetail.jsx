"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import * as React from "react";
const EASE = [0.19, 1, 0.22, 1];
export default function AuthorDetail({ avatarSrc, name, status, bio, priorityImage = false, className, }) {
    return (<motion.aside itemScope itemType="https://schema.org/Person" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.35, ease: EASE }} className={[
            "relative w-full rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-[2px]",
            "shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-5 sm:p-6",
            "dark:bg-neutral-900/70 dark:border-neutral-800",
            "font-mono text-[13px] leading-relaxed",
            "transition-transform duration-200 ease-[cubic-bezier(.19,1,.22,1)] will-change-transform",
            "hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)]",
            className || "",
        ].join(" ")} aria-label="Author information">
      <div className="flex items-start gap-4 sm:gap-5">
        {/* Avatar */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-neutral-800">
          <Image src={avatarSrc} alt={`${name} portrait`} fill sizes="(max-width: 640px) 72px, 96px" className="object-cover" priority={priorityImage}/>
        </div>

        {/* Name + status */}
        <div className="min-w-0">
          <h3 itemProp="name" className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {name}
          </h3>
          <p className="mt-0.5 text-[12px] sm:text-[13px] text-neutral-600 dark:text-neutral-400" itemProp="jobTitle">
            {status}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-4 text-[13px] text-neutral-800/90 dark:text-neutral-200/90" itemProp="description">
        {bio}
      </div>

      {/* faint bottom accent */}
      <div aria-hidden className="pointer-events-none absolute left-5 right-5 bottom-3 h-5 rounded-full bg-violet-400/15 blur-md"/>
    </motion.aside>);
}
