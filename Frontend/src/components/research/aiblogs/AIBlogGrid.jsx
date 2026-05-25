"use client";
import React from "react";
import AIBlogCard from "./AIBlogCard";
import { AnimatePresence, motion } from "framer-motion";
export default function AIBlogGrid({ posts }) {
    const safePosts = Array.isArray(posts) ? posts.filter(Boolean) : [];
    return (<section aria-label="AI blog grid" className="w-full">
      {safePosts.length === 0 ? (<div className="text-center text-gray-600 py-10">
          No AI blogs found.
        </div>) : (<motion.div layout className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-10 
            auto-rows-[minmax(350px,1fr)] 
            lg:gap-14 
            justify-items-center
          ">
          <AnimatePresence mode="popLayout">
            {safePosts.slice(0, 6).map((post, idx) => (<motion.div key={post.id} layout initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{
                    delay: Math.min(idx * 0.05, 0.4),
                    duration: 0.45,
                    ease: "easeOut",
                }} className="
                  w-full 
                  max-w-2xl 
                  sm:max-w-none 
           
           
                 
                  overflow-hidden
                ">
                <AIBlogCard {...post}/>
              </motion.div>))}
          </AnimatePresence>
        </motion.div>)}
    </section>);
}
