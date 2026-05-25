"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
export default function AIBlogCard({ title, image, imageAlt, href, category = "Insights", date = new Date(), excerpt, }) {
    const formattedDate = typeof date === "string" ? date : format(new Date(date), "d MMM yyyy");
    return (<motion.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        }} whileHover={{ y: -8 }} className="group relative mx-auto flex max-w-2xl flex-col gap-5 overflow-hidden bg-transparent font-mono transition-all duration-700" itemScope itemType="https://schema.org/BlogPosting">
        {/* Image Section */}
        <Link href={href || "/research/blogs/BlogPage"} className="block relative w-full aspect-square overflow-hidden rounded-3xl" aria-label={`Read ${title}`}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{
            duration: 0.9,
            ease: [0.19, 1, 0.22, 1],
        }} className="relative w-full h-full">
            <Image src={image} alt={imageAlt} fill loading="lazy" decoding="async" className="object-cover rounded-3xl transition-transform duration-[1600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            {/* Soft gradient hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700 rounded-3xl"/>
          </motion.div>
        </Link>

        {/* Text Section */}
        <div className="flex flex-col items-start text-left px-2 sm:px-0">
          {category && (<p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] text-gray-500 mb-2">
              {category}
            </p>)}

          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight tracking-tight group-hover:text-gray-700 transition-colors">
            <Link href={href || "/research/blogs/BlogPage"} className="hover:underline underline-offset-[6px] decoration-gray-300">
              {title}
            </Link>
          </h3>

          <time dateTime={typeof date === "string"
            ? date
            : format(new Date(date), "yyyy-MM-dd")} className="text-sm text-gray-400 mt-2">
            {formattedDate}
          </time>

          {excerpt && (<p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {excerpt}
            </p>)}
        </div>

        {/* Soft rotating glow behind */}
        <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-200/0 via-yellow-300/0 to-amber-300/0 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-[1400ms] -z-10" animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }}/>
      </motion.article>);
}
