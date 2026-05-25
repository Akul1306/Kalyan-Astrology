"use client";
import React from "react";
import AIBlogGrid from "@/components/research/aiblogs/AIBlogGrid";
import AIBlogSidebar from "@/components/research/aiblogs/AIBlogSidebar";
import { WavyBackground } from "@/components/ui/bits/wavy-background";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const demoPosts = [
    {
        id: "ai-1",
        title: "AI in Astrology",
        image: "/Blogs/AIBlogs/AIAstro.jpg",
        imageAlt: "AI in Astrology",
        href: "/research/aiblogs/AIBlogPage",
        category: "Educational",
    },
    {
        id: "ai-2",
        title: "Detecting Palm Lines with OpenCV",
        image: "/Blogs/AIBlogs/Palm.jpg",
        imageAlt: "Detecting Palm Lines with OpenCV",
        href: "/research/aiblogs/AIBlogPage",
        category: "Insights",
    },
    {
        id: "ai-3",
        title: "Drawing Vastu Maps with AI",
        image: "/Blogs/AIBlogs/Vastu.jpg",
        imageAlt: "Drawing Vastu Maps with AI",
        href: "/research/aiblogs/AIBlogPage",
        category: "Studio",
    },
    {
        id: "ai-4",
        title: "Machine Learning in Astrology",
        image: "/Blogs/AIBlogs/MLP.jpg",
        imageAlt: "Machine Learning in Palmistry",
        href: "/research/aiblogs/AIBlogPage",
        category: "Educational",
    },
];

export default function AiBlogs() {
    const [active, setActive] = React.useState();
    const categories = ["Insights", "Educational", "Studio", "Projects"];
    
    const filtered = React.useMemo(() => active
        ? demoPosts.filter((p) => (p.category || "").toLowerCase() === active.toLowerCase())
        : demoPosts, [active]);

    return (
        <section className="relative min-h-screen bg-transparent text-gray-900 overflow-hidden">
            <MovingGradient />
            
            {/* Animated Hero Section */}
            <div className="relative isolate w-full overflow-hidden">
                <WavyBackground 
                    className="flex flex-col items-center justify-center text-center py-32" 
                    backgroundFill="white" 
                    speed="fast" 
                    waveOpacity={0.15} 
                    blur={5} 
                    colors={["#3b82f6", "#6366f1", "#9333ea"]}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-black drop-shadow-lg">
                        AI Blogs
                    </h1>
                    <p className="text-base md:text-lg mt-4 text-black/80 max-w-2xl mx-auto">
                        Explore insights, experiments, and ideas blending AI with Vedic Astrology.
                    </p>
                </WavyBackground>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3 lg:pr-4">
                        <div className="lg:sticky lg:top-32">
                            <AIBlogSidebar 
                                categories={categories} 
                                activeCategory={active} 
                                onCategoryChange={setActive}
                            />
                        </div>
                    </aside>

                    {/* Blog Grid */}
                    <section className="lg:col-span-9">
                        <AIBlogGrid posts={filtered}/>
                    </section>
                </div>
            </div>

            {/* Structured Data */}
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "AI Research Blogs",
                        description: "Explore insights, experiments, and ideas blending AI with Vedic Astrology.",
                        url: "https://yourwebsite.com/research/blogs",
                    }),
                }}
            />
        </section>
    );
}
