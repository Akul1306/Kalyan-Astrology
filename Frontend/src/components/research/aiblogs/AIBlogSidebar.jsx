"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
export default function AIBlogSidebar({ categories, activeCategory, onCategoryChange, }) {
    const now = useMemo(() => new Date(), []);
    const handleCatClick = (cat) => onCategoryChange?.(cat);
    const container = {
        hidden: { opacity: 0, y: 6 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.06, delayChildren: 0.06 },
        },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.44, ease: "easeOut" } },
    };
    return (<motion.aside initial="hidden" animate="show" variants={container} className="w-full font-mono" aria-label="Blog sidebar" itemScope itemType="https://schema.org/WPSideBar">
        {/* Filters / Topics */}
        <motion.section variants={fadeUp} className="relative rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 p-5" itemScope itemType="https://schema.org/SiteNavigationElement" role="region" aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="text-sm font-semibold text-gray-800 tracking-tight">
            Filter
          </h2>

          <div className="mt-3 h-px bg-gray-100"/>

          <p className="mt-3 text-xs text-gray-500">By topic</p>

          <motion.ul className="mt-3 space-y-2" role="listbox" aria-label="Topics" tabIndex={-1}>
            <motion.li>
              <button onClick={() => handleCatClick(undefined)} className={`inline-flex items-center gap-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 px-1 py-1 rounded ${!activeCategory
            ? "font-medium text-sky-600"
            : "text-gray-600 hover:text-sky-600"}`} aria-current={!activeCategory ? "page" : undefined}>
                • All
              </button>
            </motion.li>

            {categories.map((cat) => (<li key={cat}>
                <button onClick={() => handleCatClick(cat)} className={`inline-flex items-center gap-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 px-1 py-1 rounded ${activeCategory === cat
                ? "font-medium text-sky-600"
                : "text-gray-600 hover:text-sky-600"}`} aria-current={activeCategory === cat ? "page" : undefined}>
                  {cat}
                </button>
              </li>))}
          </motion.ul>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeUp} className="mt-6 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 p-5" role="region" aria-labelledby="cta-heading">
          <h3 id="cta-heading" className="text-base font-semibold text-gray-800">
            Got an idea?
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Think it. Build it. Ship it — fast.
          </p>

          <Link href="/contact" className="mt-4 inline-flex items-center justify-between w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-sky-600 hover:text-white transition-colors" aria-label="Reach out">
            <span>Reach out</span>
            <ArrowRight className="w-4 h-4"/>
          </Link>
        </motion.section>

        {/* About */}
        <motion.section variants={fadeUp} className="mt-6 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 p-5" itemScope itemType="https://schema.org/AboutPage" role="region" aria-labelledby="about-heading">
          <h3 id="about-heading" className="text-base font-semibold text-gray-800">
            About
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            I'm <strong className="font-medium">Kalyan</strong> — weaving AI with Vedic
            Astrology to build thoughtful products.
          </p>

          <Link href="/research/blogs" className="mt-4 inline-block text-sm font-medium text-sky-600 hover:underline" aria-label="Read more about Kalyan">
            Learn more →
          </Link>

          <div className="mt-4 text-xs text-gray-400">
            <time dateTime={now.toISOString()}>{now.getFullYear()}</time>
          </div>
        </motion.section>
      </motion.aside>);
}
