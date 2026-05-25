"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
const mono = "font-[family:'Geist_Mono','SFMono-Regular','Menlo',monospace]";
export default function AIBlogRelatedPosts({ posts, title = "More Articles", }) {
    const scrollRef = useRef(null);
    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
    };
    if (!posts.length)
        return null;
    return (<section className="px-6 sm:px-12 lg:px-20 py-24 relative">
      {/* Title */}
      <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${mono} text-[1.9rem] sm:text-[2.3rem] tracking-tight font-medium text-black mb-10`}>
        {title}
      </motion.h2>

      <div className="relative">
        {/* Scroll Container */}
        <div ref={scrollRef} className="flex gap-10 overflow-x-auto scrollbar-hide pb-4 pr-10 scroll-smooth snap-x snap-mandatory">
          {posts.map((post, i) => (<motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex-shrink-0 w-[290px] sm:w-[330px] snap-start group">
              <Link href={post.href || `/research/blogs/${post.id || "BlogPage"}`} className="block rounded-2xl backdrop-blur-xl border border-black/5 shadow-[0_0_60px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_-10px_rgba(0,0,0,0.22)] hover:-translate-y-1">
                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden rounded-2xl">

                  <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 768px) 85vw, 25vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.12]"/>
                </div>

                {/* TEXT */}
                <div className="pt-6 pb-8 px-2">
                  <p className={`${mono} text-[0.65rem] uppercase tracking-[0.32em] text-gray-500 mb-3`}>
                    {post.category}
                  </p>
                  <h3 className="text-[1.1rem] font-medium text-black leading-snug group-hover:text-gray-700 transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (<p className="mt-3 text-[0.82rem] text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>)}
                </div>
              </Link>
            </motion.div>))}
        </div>

        {/* Scroll Arrow */}
        {posts.length > 3 && (<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/70 backdrop-blur-xl border border-black/10 shadow-lg rounded-full p-3">
            <ChevronRight className="w-6 h-6 text-gray-700"/>
          </motion.button>)}
      </div>
    </section>);
}
