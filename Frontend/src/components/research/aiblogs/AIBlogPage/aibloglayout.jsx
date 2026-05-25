"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
/* -------------------------------------------------------------
   CONFIG: ANIMATION + TYPOGRAPHY
------------------------------------------------------------- */
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.25,
        },
    },
};
const item = {
    hidden: { opacity: 0, y: 22 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};
const mono = "font-[family:'Geist_Mono','SFMono-Regular','Menlo','Roboto_Mono',monospace]";
const body = "font-[family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Roboto,sans-serif]";
/* -------------------------------------------------------------
   COMPONENT
------------------------------------------------------------- */
export default function AIBlogLayout({ post }) {
    const formattedDate = typeof post.date === "string"
        ? post.date
        : format(new Date(post.date), "MMMM d, yyyy");
    const readingTime = post.readingTime || "8 min read";
    return (<>
      <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">

        {/* BREADCRUMB — Thin, techy, discreet */}
        <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pt-16 pb-6 px-6 max-w-4xl mx-auto">
          <ol className={`${mono} flex items-center space-x-3 text-[0.62rem] tracking-[0.28em] text-gray-500 uppercase`}>
            <li><Link href="/" className="hover:text-black/90">Home</Link></li>
            <li>›</li>
            <li><Link href="/research/aiblogs" className="hover:text-black/90">AI Blogs</Link></li>
            <li>›</li>
            <li className="opacity-80 truncate">{post.title}</li>
          </ol>
        </motion.nav>

        {/* TITLE BLOCK */}
        <section className="px-6 pt-10 pb-20">
          <div className="max-w-4xl mx-auto">

            {/* Main Title */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={`${mono} 
                text-[2rem] md:text-[2.6rem] lg:text-[3rem]
                leading-[1.15]
                tracking-tight 
                font-medium
                text-center md:text-left`}>
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.65 }} className={`${body} mt-5 flex flex-wrap gap-3 text-gray-600 text-sm md:text-[0.95rem] justify-center md:justify-start`}>
              {post.author && (<span className="text-black">{post.author}</span>)}
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{readingTime}</span>
            </motion.div>
          </div>
        </section>

        {/* HERO IMAGE — Square, clean, premium */}
        <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="
            relative 
            mx-auto 
            w-full max-w-3xl 
            aspect-square 
            overflow-hidden 
            rounded-[28px]
            shadow-[0_12px_60px_-20px_rgba(0,0,0,0.12)]
          ">
          <Image src={post.content.heroImage} alt={post.content.heroImageAlt} fill quality={100} className="object-cover scale-[1.02]"/>

          {/* Glass Film */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"/>
        </motion.div>

        {/* ARTICLE CONTENT */}
        <motion.article variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-200px" }} className="px-6 py-24 max-w-3xl mx-auto">
          {post.content.sections.map((section, i) => (<motion.section key={i} variants={item} className="mb-24">

              <h2 className={`${mono} 
                  text-[1.65rem] md:text-[2rem] 
                  tracking-tight 
                  font-medium 
                  mb-8`}>
                {section.heading}
              </h2>

              {section.paragraphs.map((p, j) => (<p key={j} className={`${body} 
                    text-[1.03rem] md:text-[1.15rem] 
                    leading-[1.75] 
                    text-[#1d1d1f]
                    mb-6`}>
                  {p}
                </p>))}
            </motion.section>))}
        </motion.article>
      </div>
    </>);
}
