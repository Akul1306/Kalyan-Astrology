"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function RelatedProducts({ title = "Related Products", products = [], }) {
    const containerRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const scrollToIndex = (index) => {
        if (!containerRef.current)
            return;
        const width = containerRef.current.clientWidth;
        const snapX = width * 0.72;
        containerRef.current.scrollTo({
            left: snapX * index,
            behavior: "smooth",
        });
        setCurrent(index);
    };
    const prev = () => scrollToIndex(Math.max(0, current - 1));
    const next = () => scrollToIndex(Math.min(products.length - 1, current + 1));
    return (<section className="w-full mt-14 relative">
      <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4 tracking-tight font-[Inter]">
        {title}
      </h2>

      {/* FIXED ARROW BUTTONS */}
      <button onClick={prev} className={`
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          h-10 w-10 rounded-full bg-white shadow-md
          flex items-center justify-center
          hover:scale-[1.08] transition
        `}>
        <span className="text-xl font-bold">‹</span>
      </button>

      <button onClick={next} className={`
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          h-10 w-10 rounded-full bg-white shadow-md
          flex items-center justify-center
          hover:scale-[1.08] transition
        `}>
        <span className="text-xl font-bold">›</span>
      </button>

      <div ref={containerRef} className="overflow-x-auto no-scrollbar scroll-smooth flex gap-6 snap-x snap-mandatory pb-2" style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
        }}>
        {products.map((p, i) => {
            // Determine product page based on image path or product type
            const getProductPath = () => {
                if (p.image?.includes('/Gems/'))
                    return `/store/gems/Product?id=${p.id}`;
                if (p.image?.includes('/Poster/'))
                    return `/store/poster/Product?id=${p.id}`;
                if (p.image?.includes('/Accessories/'))
                    return `/store/accessories/Product?id=${p.id}`;
                return `/store/gems/Product?id=${p.id}`; // default
            };
            return (<Link href={getProductPath()} key={p.id}>
          <motion.div className="snap-start min-w-[250px] max-w-[250px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group transition-all duration-300" initial={{ opacity: 0.3, scale: 0.96 }} animate={{
                    opacity: 1,
                    scale: i === current ? 1 : 0.97,
                }} transition={{ duration: 0.5, ease: "easeOut" }} whileHover={{ scale: 1.04 }}>
            <div className="relative h-48 w-full overflow-hidden">
              <Image src={p.image || "/placeholder.png"} alt={p.title} fill quality={90} loading="lazy" sizes="(max-width: 640px) 250px, 250px" className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                    const target = e.target;
                    if (target.src !== "/placeholder.png") {
                        target.src = "/placeholder.png";
                    }
                }}/>
            </div>

            <div className="p-3">
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                {p.brand || "Brand"}
              </p>

              <h3 className="text-sm font-semibold mt-1 text-gray-900 leading-snug font-[Inter]">
                {p.title}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-black">
                  ₹{p.price}
                </span>

                {p.oldPrice && (<>
                    <span className="text-sm line-through text-gray-400">
                      ₹{p.oldPrice}
                    </span>
                    <span className="text-[10px] bg-black text-white px-2 py-[2px] rounded-md">
                      {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                    </span>
                  </>)}
              </div>
            </div>
          </motion.div>
          </Link>);
        })}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>);
}
