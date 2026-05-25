"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useKundliStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";

// Astral Image Fallback Mapper
const getAstrologicalCover = (title = "", tags = [], category = "") => {
    const searchStr = `${title} ${tags.join(" ")} ${category}`.toLowerCase();
    if (searchStr.includes("mangal") || searchStr.includes("badh") || searchStr.includes("mars")) {
        return "/Blogs/blogimg/MangalBadh.webp";
    }
    if (searchStr.includes("pitra") || searchStr.includes("ancestral") || searchStr.includes("pitru")) {
        return "/Blogs/blogimg/PitraDosh.webp";
    }
    if (searchStr.includes("stree") || searchStr.includes("dosh") || searchStr.includes("relationship") || searchStr.includes("stri")) {
        return "/Blogs/blogimg/StreeDosh.webp";
    }
    return "/Blogs/blogimg/StreeDosh.webp"; // Default fallback
};

export const BlogCard = ({
    id,
    _id,
    title,
    image,
    imageAlt,
    date,
    excerpt,
    author,
    authorId,
    category,
    href,
    content,
    tags,
    createdAt,
    onEdit,
    onDelete,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { currentUser, isAuthenticated } = useKundliStore();
    const navigate = useNavigate();

    const handleGuestAccess = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            e.stopPropagation();
            navigate("/login", { state: { from: { pathname: "/research/blogs" } } });
            return true;
        }
        return false;
    };

    const isOwner = currentUser && (currentUser._id === authorId || currentUser.id === authorId);
    const isAdmin = currentUser && currentUser.role === "admin";
    const canEdit = isOwner;
    const canDelete = isOwner || isAdmin;

    const blogId = id || _id;
    const blogUrl = href || `/research/blogs/${blogId || "BlogPage"}`;
    
    // Astro cover image mapping
    const finalImage = (image && image !== "/placeholder.png" && image.trim() !== "") 
        ? image 
        : null;

    // Astro category mapping
    const finalCategory = category || (tags && tags.length > 0 ? tags[0] : "Astrology");

    // Dynamic excerpt mapping
    const finalExcerpt = excerpt || (content ? `${content.slice(0, 150)}...` : "");

    // Safe date parsing
    const displayDate = date || createdAt || new Date();
    let formattedDate = "Recently";
    try {
        formattedDate = typeof displayDate === "string" || displayDate instanceof Date
            ? format(new Date(displayDate), "d MMM yyyy")
            : format(new Date(), "d MMM yyyy");
    } catch (e) {
        console.warn("Date formatting error:", e);
    }

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={isExpanded ? {} : { y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`group relative flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-500 backdrop-blur-sm ${
                isExpanded 
                    ? "border-sky-400 bg-gradient-to-b from-white via-sky-50/10 to-sky-100/20 shadow-2xl" 
                    : "border-gray-200 bg-gradient-to-b from-white/90 to-gray-50 shadow-md hover:shadow-2xl hover:border-sky-200"
            }`}
            itemScope
            itemType="https://schema.org/BlogPosting"
        >
            {/* Image Container */}
            {finalImage && (
                <div className={`relative w-full overflow-hidden transition-all duration-500 ${isExpanded ? "aspect-[21/9]" : "aspect-square"}`}>
                    <Link
                        href={isAuthenticated ? blogUrl : "#"}
                        onClick={handleGuestAccess}
                        className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-t-2xl"
                        aria-label={`Read more about ${title}`}
                    >
                        <motion.div className="w-full h-full overflow-hidden" whileHover={isExpanded ? {} : { scale: 1.05 }} transition={{ duration: 0.5 }}>
                            <Image
                                src={finalImage}
                                alt={imageAlt || title}
                                fill
                                quality={90}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover rounded-t-2xl"
                                loading="lazy"
                                priority={false}
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4="
                                onError={(e) => {
                                    const target = e.target;
                                    if (target.src !== "/placeholder.png") {
                                        target.src = "/placeholder.png";
                                    }
                                }}
                            />
                        </motion.div>
                    </Link>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {finalCategory && (
                            <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full backdrop-blur-sm shadow-sm">
                                {finalCategory}
                            </span>
                        )}
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-sky-600/90 text-white text-xs font-medium rounded-full shadow-md backdrop-blur-sm">
                        <time
                            dateTime={
                                typeof displayDate === "string"
                                    ? displayDate
                                    : format(new Date(displayDate), "yyyy-MM-dd")
                            }
                            itemProp="datePublished"
                        >
                            {formattedDate}
                        </time>
                    </div>
                </div>
            )}

            {/* Card Body */}
            <div className="flex flex-col flex-grow p-5 sm:p-6">
                {!finalImage && (
                    <div className="flex items-center justify-between gap-4 mb-3">
                        {finalCategory && (
                            <span className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-medium rounded-full border border-sky-100">
                                {finalCategory}
                            </span>
                        )}
                        <time
                            className="text-xs text-gray-500 font-medium"
                            dateTime={
                                typeof displayDate === "string"
                                    ? displayDate
                                    : format(new Date(displayDate), "yyyy-MM-dd")
                            }
                            itemProp="datePublished"
                        >
                            {formattedDate}
                        </time>
                    </div>
                )}
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">
                    <Link href={isAuthenticated ? blogUrl : "#"} onClick={handleGuestAccess} itemProp="headline">
                        {title}
                    </Link>
                </h2>

                {author && (
                    <p className="text-sm text-gray-600 mb-3 italic" itemProp="author" itemScope itemType="https://schema.org/Person">
                        By <span itemProp="name">{author}</span>
                    </p>
                )}

                {!isExpanded && finalExcerpt && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3" itemProp="description">
                        {finalExcerpt}
                    </p>
                )}

                {/* Inline Expanded Content */}
                <AnimatePresence>
                    {isExpanded && content && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div
                                className="mt-2 pt-4 border-t border-sky-100 text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-normal bg-sky-50/30 p-4 rounded-xl border border-sky-100/50 mb-4"
                                itemProp="articleBody"
                            >
                                {content}
                            </div>
                            
                            {tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {tags.map((tag, i) => (
                                        <span key={i} className="px-2.5 py-0.5 bg-sky-50 text-sky-600 text-xs font-medium rounded-full border border-sky-100">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={(e) => {
                                if (handleGuestAccess(e)) return;
                                setIsExpanded(!isExpanded);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                            aria-label={isExpanded ? `Collapse: ${title}` : `Expand: ${title}`}
                        >
                            {isExpanded ? "Collapse Wisdom ↑" : "Expand Wisdom ↓"}
                        </button>

                        <Link
                            href={isAuthenticated ? blogUrl : "#"}
                            onClick={handleGuestAccess}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors"
                            aria-label={`Read dedicated page: ${title}`}
                        >
                            Full Page ↗
                        </Link>
                    </div>

                    {/* Edit and Delete Actions (Available for authorized users) */}
                    {((canEdit && onEdit) || (canDelete && onDelete)) && (
                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-dashed border-gray-100">
                            {canEdit && onEdit && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit({ id, _id, title, content, author, tags, category, image, authorId });
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-all duration-200 cursor-pointer"
                                >
                                    Edit ✍️
                                </button>
                            )}
                            {canDelete && onDelete && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete({ id, _id, title, content, author, tags, category, image, authorId });
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-950 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-all duration-200 cursor-pointer"
                                    title="Delete Blog"
                                >
                                    Delete 🗑️
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Animated Border Glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-sky-400/60 transition duration-500 pointer-events-none"
                animate={{
                    boxShadow: [
                        "0 0 0px rgba(56,189,248,0)",
                        "0 0 25px rgba(56,189,248,0.25)",
                        "0 0 0px rgba(56,189,248,0)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "@id": blogUrl,
                        headline: title,
                        image: finalImage,
                        datePublished:
                            typeof displayDate === "string"
                                ? displayDate
                                : format(new Date(displayDate), "yyyy-MM-dd"),
                        author: author
                            ? { "@type": "Person", name: author }
                            : undefined,
                        description: finalExcerpt,
                        articleBody: content,
                        url: blogUrl,
                    }),
                }}
            />
        </motion.article>
    );
};

export default BlogCard;
