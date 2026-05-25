"use client";
import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
/** Inline SVG noise (light pastel grain, zero network hit) */
const NOISE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
    <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter>
    <rect width='100%' height='100%' filter='url(#n)' opacity='0.25'/>
  </svg>`)}`;
export function HoverEffect({ items, className, }) {
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    return (<div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10", className)}>
      {items.map((item, idx) => (<motion.div key={item.href} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)} initial={false} whileHover={{ y: -6, scale: 1.015 }} whileTap={{ scale: 0.992 }} transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }} className="relative h-full will-change-transform">
          <AnimatedCard item={item} active={hoveredIndex === idx}/>
        </motion.div>))}

      {/* --- Global Styles for Glow + Grain --- */}
      <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes rotate {
          to {
            --angle: 360deg;
          }
        }

        /* === Glowing Rotating Border === */
        .cardFx {
          position: relative;
          border-radius: 1rem;
          isolation: isolate;
          overflow: hidden;
        }

        .cardFx::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1.5px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle),
            rgba(218, 190, 255, 0.85),
            rgba(190, 220, 255, 0.85),
            rgba(240, 210, 255, 0.85),
            rgba(218, 190, 255, 0.85)
          );
          animation: rotate 6s linear infinite;
          mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none;
          z-index: 0;
          will-change: opacity;
        }

        .cardFx:hover::before,
        .cardFx:focus-within::before {
          opacity: 1;
        }

        /* === Corner Gradient + Grain (behind card content) === */
        .cornerFX {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 56%;
          height: 56%;
          pointer-events: none;
          opacity: 0;
          transform: translate3d(5px, 5px, 0) scale(0.985);
          transition: opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1),
            transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 0; /* stay behind content */
          background-image: radial-gradient(
              80% 80% at 100% 100%,
              rgba(235, 222, 255, 0.9) 0%,
              rgba(214, 201, 255, 0.75) 35%,
              rgba(200, 190, 255, 0.6) 65%,
              rgba(214, 201, 255, 0) 100%
            ),
            url("${NOISE_DATA_URI}");
          background-repeat: no-repeat, repeat;
          background-size: cover, 160px 160px;
          -webkit-mask: radial-gradient(
            120% 120% at 100% 100%,
            #000 55%,
            transparent 75%
          );
          mask: radial-gradient(120% 120% at 100% 100%, #000 55%, transparent 75%);
          will-change: transform, opacity;
        }

        .cardFx:hover .cornerFX,
        .cardFx:focus-within .cornerFX {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }
      `}</style>
    </div>);
}
function AnimatedCard({ item, active }) {
    const { title, description, href, Icon } = item;
    const safeHref = href && typeof href === "string" && href.trim().length > 0 ? href.trim() : "#";
    return (<Link href={safeHref} aria-label={`${title}: ${description}`} className="group relative block p-2 h-full">
      <AnimatePresence>
        {active && (<motion.span className="absolute inset-0 block rounded-3xl bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50" layoutId="hoverBackground" initial={{ opacity: 0 }} animate={{
                opacity: 1,
                transition: { duration: 0.18, ease: "easeOut" },
            }} exit={{
                opacity: 0,
                transition: { duration: 0.18, ease: "easeIn" },
            }}/>)}
      </AnimatePresence>

      <div className={cn("cardFx relative z-10 rounded-2xl overflow-hidden", "aspect-[5/4] w-full", "bg-white/60 backdrop-blur-sm border border-gray-100", "shadow-[0_2px_8px_rgba(0,0,0,0.03)]")}>
        {/* Corner pastel grain (behind content) */}
        <div aria-hidden="true" className="cornerFX"/>

        {/* Card content */}
        <div className="relative z-[1] flex h-full flex-col p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-100 text-violet-700 shadow-sm">
              <Icon className="h-6 w-6" strokeWidth={1.8}/>
            </div>
            <h4 className="text-lg font-semibold tracking-tight text-gray-900">
              {title}
            </h4>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-gray-700 line-clamp-3">
            {description}
          </p>

          <div className="mt-auto"/>
        </div>
      </div>
    </Link>);
}
