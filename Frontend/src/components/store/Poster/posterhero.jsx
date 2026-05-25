"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, } from "framer-motion";
import * as React from "react";
export default function PosterHero({ posters = [
    "/Poster/Posters/pos1.webp",
    "/Poster/Posters/pos2.webp",
    "/Poster/Posters/pos3.webp",
    "/Poster/Posters/pos4.webp",
    "/Poster/Posters/pos5.webp",
    "/Poster/Posters/pos6.webp",
], slideIntervalMs = 6000, bgColors = [
    "#F5C6EC", // pink pastel
    "#B8E3FF", // blue pastel
    "#FFE3A3", // yellow pastel
    "#D7F9E9", // mint
    "#FDD8C6", // coral
    "#E2D5FF", // lavender
], bgChangeIntervalMs = 7000, marqueeText = "NEW • FEATURED • NEXT • LIMITED • COLLECTORS EDITION", className, }) {
    const [posterIndex, setPosterIndex] = React.useState(0);
    const [bgIndex, setBgIndex] = React.useState(0);
    const [fade, setFade] = React.useState(true);
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useTransform(my, [-0.5, 0.5], [3, -3]);
    const ry = useTransform(mx, [-0.5, 0.5], [-3, 3]);
    const rotateX = useSpring(rx, { stiffness: 100, damping: 18 });
    const rotateY = useSpring(ry, { stiffness: 100, damping: 18 });
    const onMove = React.useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mx, my]);
    const onLeave = React.useCallback(() => {
        mx.set(0);
        my.set(0);
    }, [mx, my]);
    React.useEffect(() => {
        if (!posters || posters.length === 0)
            return;
        const slide = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setPosterIndex((p) => (p + 1) % posters.length);
                setFade(true);
            }, 400);
        }, slideIntervalMs);
        return () => clearInterval(slide);
    }, [posters, slideIntervalMs]);
    React.useEffect(() => {
        if (!bgColors || bgColors.length === 0)
            return;
        const bg = setInterval(() => {
            setBgIndex((b) => (b + 1) % bgColors.length);
        }, bgChangeIntervalMs);
        return () => clearInterval(bg);
    }, [bgColors, bgChangeIntervalMs]);
    const marqueeCopies = Array.from({ length: 2 }, () => marqueeText + " • ");
    const combinedClassName = [
        "relative h-[100svh] w-full overflow-hidden select-none",
        "text-black font-[Playfair_Display]",
        className || "",
    ]
        .filter(Boolean)
        .join(" ");
    // Fallback for SSR
    if (!isMounted) {
        return (<section className={combinedClassName} style={{ backgroundColor: bgColors[bgIndex] || bgColors[0] || "#F5C6EC" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[min(42vw,400px)] aspect-[17/22]">
            <Image src={posters[posterIndex] || posters[0] || "/Poster/Posters/pos1.webp"} alt={`Poster ${posterIndex + 1}`} fill priority sizes="(max-width: 1024px) 80vw, 420px" className="object-cover"/>
          </div>
        </div>
      </section>);
    }
    return (<motion.section aria-label="Poster hero" className={combinedClassName} style={{ backgroundColor: bgColors[bgIndex] || bgColors[0] || "#F5C6EC" }} animate={{ backgroundColor: bgColors[bgIndex] || bgColors[0] || "#F5C6EC" }} transition={{ duration: 1.8, ease: "easeInOut" }}>
      {/* Grain Texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.8'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            mixBlendMode: "multiply",
        }}/>

      {/* Fixed Marquee */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee text-black/20 opacity-40">
          {marqueeCopies.map((txt, i) => (<span key={i} className="text-[clamp(52px,8vw,160px)] font-extrabold tracking-[-0.03em] uppercase px-[3vw]">
              {txt}
            </span>))}
        </div>
      </div>

      {/* Poster */}
      <div className="relative z-[3] flex h-full w-full items-center justify-center" onMouseMove={onMove} onMouseLeave={onLeave}>
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
          <motion.div className="relative w-[min(42vw,400px)] aspect-[17/22]" initial={{ rotate: 5 }} animate={{ rotate: 5 }} whileHover={{
            scale: 1.05,
            rotate: 5.5,
            filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.35)) drop-shadow(0 12px 20px rgba(0,0,0,0.25))",
        }} transition={{
            type: "spring",
            stiffness: 180,
            damping: 16,
        }}>
            <motion.div key={posterIndex} initial={{ opacity: 0, scale: 1.02 }} animate={{
            opacity: fade ? 1 : 0,
            scale: fade ? 1 : 1.02,
        }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-0">
              <Image src={posters[posterIndex] || posters[0] || "/Poster/Posters/pos1.webp"} alt={`Poster ${posterIndex + 1}`} fill priority quality={90} sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 420px" className="object-cover" loading="eager" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (posters[0] && target.src !== posters[0]) {
                target.src = posters[0];
            }
        }} style={{
            filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.25)) drop-shadow(0 8px 14px rgba(0,0,0,0.18))",
        }}/>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: inline-flex;
        }
      `}</style>
    </motion.section>);
}
