"use client";
import React from "react";
import { motion } from "framer-motion";
// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
import AIBlogLayout from "@/components/research/aiblogs/AIBlogPage/aibloglayout";
import AIBlogRelatedPosts from "@/components/research/aiblogs/AIBlogPage/airelatedpost";
import AIRecentPosts from "@/components/research/aiblogs/AIBlogPage/airecentpost";
import AICategories from "@/components/research/aiblogs/AIBlogPage/aicategories";
/* ---------------------------
   FEATURED POST
--------------------------- */
const featuredPost = {
    id: "future-of-vedic-wisdom",
    title: "AI in Astrology",
    image: "/Blogs/AIBlogs/AIAstro.jpg",
    imageAlt: "AI in Astrology",
    date: "2025-11-18",
    author: "Soham Vashist",
    readingTime: "8 min read",
    excerpt: "How AI can be used in Astrology to improve the accuracy of predictions.",
    content: {
        heroImage: "/Blogs/AIBlogs/AIAstro.jpg",
        heroImageAlt: "Celestial digital art representing Vedic knowledge",
        sections: [
            {
                heading: "Reimagining Tradition for Modern Minds",
                paragraphs: [
                    "Vedic wisdom has always been a living tradition—one that thrives on reinterpretation and contextual relevance...",
                    "Rather than diluting authenticity, the intentional use of technology can heighten reverence...",
                ],
            },
            {
                heading: "Precision Meets Personalization",
                paragraphs: [
                    "Machine learning models now parse astronomical datasets...",
                    "Imagine a guidance experience where your birth chart seamlessly syncs...",
                ],
            },
            {
                heading: "Designing Interfaces That Feel Like Breathwork",
                paragraphs: [
                    "Apple taught the world that silence can be a design element...",
                    "Typography, spacing, and motion carry metaphysical weight...",
                ],
            },
        ],
    },
};
/* ---------------------------
   RECENT POSTS
--------------------------- */
const recentPosts = [
    {
        id: "1",
        title: "Detecting Palm Lines with OpenCV",
        image: "/Blogs/AIBlogs/Palm.jpg",
        imageAlt: "Detecting Palm Lines with OpenCV",
        date: "2025-11-10",
        category: "Insights",
        href: "/research/aiblogs/AIBlogPage",
    },
    {
        id: "2",
        title: "Drawing Vastu Maps with AI",
        image: "/Blogs/AIBlogs/Vastu.jpg",
        imageAlt: "Drawing Vastu Maps with AI",
        date: "2025-11-05",
        category: "Studio",
        href: "/research/aiblogs/AIBlogPage",
    },
    {
        id: "3",
        title: "AI in Astrology",
        image: "/Blogs/AIBlogs/AIAstro.jpg",
        imageAlt: "AI in Astrology",
        date: "2025-10-28",
        category: "Educational",
        href: "/research/blogs/ai-astrology",
    },
    {
        id: "4",
        title: "Machine Learning in Astrology",
        image: "/Blogs/AIBlogs/MLP.jpg",
        imageAlt: "Machine Learning in Astrology",
        date: "2025-10-28",
        category: "Educational",
        href: "/research/blogs/machine-learning-in-astrology",
    },
];
/* ---------------------------
   MORE ARTICLES
--------------------------- */
const moreArticles = [
    {
        id: "1",
        title: "Detecting Palm Lines with OpenCV",
        image: "/Blogs/AIBlogs/Palm.jpg",
        imageAlt: "Detecting Palm Lines with OpenCV",
        date: "2025-11-10",
        category: "Insights",
        href: "/research/aiblogs/AIBlogPage",
    },
    {
        id: "2",
        title: "Drawing Vastu Maps with AI",
        image: "/Blogs/AIBlogs/Vastu.jpg",
        imageAlt: "Drawing Vastu Maps with AI",
        date: "2025-11-05",
        category: "Studio",
        href: "/research/aiblogs/AIBlogPage",
    },
    {
        id: "3",
        title: "AI in Astrology",
        image: "/Blogs/AIBlogs/AIAstro.jpg",
        imageAlt: "AI in Astrology",
        date: "2025-10-28",
        category: "Educational",
        href: "/research/blogs/ai-astrology",
    },
    {
        id: "4",
        title: "Machine Learning in Astrology",
        image: "/Blogs/AIBlogs/MLP.jpg",
        imageAlt: "Machine Learning in Astrology",
        date: "2025-10-28",
        category: "Educational",
        href: "/research/blogs/machine-learning-in-astrology",
    },
];
/* ---------------------------
   PAGE
--------------------------- */
export default function AIBlogPage() {
    return (<main className="bg-white text-black antialiased">
      <section className="px-6 sm:px-10 lg:px-20 py-10">
        <div className="
            mx-auto max-w-7xl 
            grid grid-cols-1 lg:grid-cols-[2fr_1fr]
            gap-12
          ">
          {/* LEFT — THE BLOG */}
          <div className="order-2 lg:order-1">
            <AIBlogLayout post={featuredPost}/>
          </div>

          {/* RIGHT — SIDEBAR (Visible from start) */}
          <aside className="order-1 lg:order-2 lg:sticky lg:top-24 space-y-8">

            {/* RECENT POSTS */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <AIRecentPosts posts={recentPosts}/>
            </motion.div>

            {/* CATEGORIES */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
              <AICategories />
            </motion.div>
          </aside>
        </div>
      </section>

      {/* RELATED POSTS */}
      <AIBlogRelatedPosts posts={moreArticles}/>

      {/* FOOTER */}
      <footer className="py-14 text-center text-sm tracking-wide text-[#666]">
        © 2025 Soham Vashist • All rights reserved
      </footer>
    </main>);
}
