"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
const mono = "font-[family:'Geist_Mono','SFMono-Regular','Menlo',monospace]";
export default function AIRecentPosts({ posts }) {
    if (!posts.length)
        return null;
    return (<section className="rounded-[22px] border border-black/10 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_-20px_rgba(0,0,0,0.12)]" aria-label="Recent blog posts">
      <h2 className={`${mono} text-[1.1rem] tracking-tight font-medium text-black mb-6`}>
        Recent Posts
      </h2>

      <ul className="space-y-7">
        {posts.map((post, i) => {
            const d = post.date ?? new Date();
            const formatted = typeof d === "string" ? d : format(new Date(d), "d MMM yyyy");
            return (<motion.li key={post.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.1 }}>
              <Link href={post.href || `/research/blogs/${post.id}`} className="flex gap-4 group">
                {/* THUMBNAIL */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-xl bg-gray-100 border border-black/5">
                  <Image src={post.image} alt={post.imageAlt} fill className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.1]"/>
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.95rem] font-medium text-black leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </p>

                  <time className={`${mono} text-[0.65rem] text-gray-500 tracking-wide flex items-center mt-2`}>
                    {formatted}
                  </time>
                </div>
              </Link>
            </motion.li>);
        })}
      </ul>
    </section>);
}
