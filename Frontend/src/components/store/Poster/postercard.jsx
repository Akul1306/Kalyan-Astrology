"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function PosterGrid({ posters }) {
    return (<section className="w-full py-24">
      <div className="
          max-w-[1800px] mx-auto
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3
          gap-14 px-6
        ">
        {posters.map((poster) => (<PosterCard key={poster.id} poster={poster}/>))}
      </div>
    </section>);
}
function PosterCard({ poster }) {
    const [hover, setHover] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    useEffect(() => {
        if (!hover)
            return;
        const interval = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % poster.images.length);
        }, 950);
        return () => clearInterval(interval);
    }, [hover, poster.images.length]);
    return (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <Link href={`/store/poster/Product?id=${poster.id}`} className="
          group relative block w-full
          overflow-hidden rounded-xl
          bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-md
          border border-white/20
          hover:border-white/30
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        " onMouseEnter={() => setHover(true)} onMouseLeave={() => {
            setHover(false);
            setImgIndex(0);
        }}>
        {/* Maintain 2550x3300 ratio */}
        <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "2550 / 3300" }}>
          {/* Poster Image */}
          <motion.div className="absolute inset-0" animate={{
            scale: hover ? 1.06 : 1,
            y: hover ? -6 : 0,
        }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <Image src={poster.images[imgIndex] || poster.images[0] || "/Poster/Posters/pos1.webp"} alt={poster.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px" className="object-cover object-center" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (target.src !== poster.images[0] && poster.images[0]) {
                target.src = poster.images[0];
            }
        }}/>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 via-black/30 to-transparent transition-all duration-500"/>

          {/* Glass Info Block */}
          <motion.div className="
              absolute bottom-8 left-1/2 -translate-x-1/2
              w-[90%] sm:w-[85%]
              rounded-2xl px-8 py-6
              bg-white/15 backdrop-blur-md border border-white/20
              text-white text-center
              transition-all duration-500 group-hover:bg-white/25
              font-sans
            " animate={{ y: hover ? -10 : 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h3 className="text-2xl font-semibold tracking-wide leading-snug mb-2 drop-shadow-md">
              {poster.title}
            </h3>

            <p className="text-[14px] uppercase tracking-[0.15em] text-white/80 mb-3 font-light">
              {poster.category}
            </p>

            <div className="flex items-center justify-center gap-3">
              {poster.oldPrice && (<span className="text-white/60 line-through text-base">
                  ₹{poster.oldPrice}
                </span>)}
              <span className="text-yellow-400 font-semibold text-xl">
                ₹{poster.price}
              </span>
            </div>
          </motion.div>

          {/* Ambient Glow */}
          <motion.div className="absolute inset-0 pointer-events-none rounded-xl" animate={{
            background: hover
                ? "radial-gradient(circle at 50% 85%, rgba(255,230,150,0.15), transparent 70%)"
                : "transparent",
        }} transition={{ duration: 0.8, ease: "easeOut" }}/>
        </div>
      </Link>
    </motion.div>);
}
