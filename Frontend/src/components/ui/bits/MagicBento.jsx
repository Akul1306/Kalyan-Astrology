// components/BentoGrid.tsx
"use client";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
const DEFAULT_ITEMS = [
    { id: 1, title: "Tantra", link: "/workshop/Tantra", imageUrl: "/workshop-bento/Tantra.jpg" },
    { id: 2, title: "Meditation", link: "/workshop/meditation-sessions", imageUrl: "/workshop-bento/Meditation.jpg" },
    { id: 3, title: "Bhagavad Gita", link: "/workshop/bhagavad-gita", imageUrl: "/workshop-bento/Gita.jpg" },
    { id: 4, title: "Yoga", link: "/workshop/yoga-workshops", imageUrl: "/workshop-bento/Yoga.jpg" },
    { id: 5, title: "Ayurveda", link: "/workshop/ayurveda-workshops", imageUrl: "/workshop-bento/Ayurveda.jpg" },
    { id: 6, title: "Astrology", link: "/workshop/Astrology-workshops", imageUrl: "/workshop-bento/Astrology.jpg" },
    { id: 7, title: "Sadhna", link: "/workshop/sadhna", imageUrl: "/workshop-bento/Sadhna.jpg" },
    { id: 8, title: "Sanskrit", link: "/workshop/Sanskrit-workshops", imageUrl: "/workshop-bento/Sanskrit.jpg" },
];
function clamp(n, a = 0, b = 1) {
    return Math.max(a, Math.min(b, n));
}
/**
 * BentoGrid
 * - Keeps your layout exactly the same (col/row spans & sizes).
 * - Accepts items prop (8 recommended), otherwise uses defaults.
 * - Cursor-reactive aura + floating shimmer implemented using CSS vars and rAF for smoothness.
 * - GPU friendly: uses transform/opacity/blur only; minimal DOM updates.
 */
export default function BentoGrid({ items = DEFAULT_ITEMS, className = "", auraIntensity = 0.95, }) {
    const hostRef = useRef(null);
    // Smooth cursor tracking (lerped)
    const posRef = useRef({ x: 0, y: 0, lx: 0, ly: 0 });
    const onMove = useCallback((e) => {
        const el = hostRef.current;
        if (!el)
            return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        posRef.current.x = x;
        posRef.current.y = y;
    }, []);
    const onLeave = useCallback(() => {
        // move aura to center with low intensity when leaving
        const el = hostRef.current;
        if (!el)
            return;
        const rect = el.getBoundingClientRect();
        posRef.current.x = rect.width / 2;
        posRef.current.y = rect.height / 2;
        // fade out
        el.style.setProperty("--aura-opacity", "0");
    }, []);
    // rAF loop to lerp and set CSS variables (keeps DOM writes minimal)
    useEffect(() => {
        let raf = 0;
        const el = hostRef.current;
        if (!el)
            return;
        // seed center
        const rect = el.getBoundingClientRect();
        posRef.current.lx = rect.width / 2;
        posRef.current.ly = rect.height / 2;
        posRef.current.x = rect.width / 2;
        posRef.current.y = rect.height / 2;
        // initial css vars
        el.style.setProperty("--aura-opacity", "0.9");
        el.style.setProperty("--aura-intensity", String(clamp(auraIntensity, 0, 1)));
        const tick = () => {
            const p = posRef.current;
            // lerp
            p.lx += (p.x - p.lx) * 0.12;
            p.ly += (p.y - p.ly) * 0.12;
            // normalize relative to host size to keep effect consistent on resize
            const r = el.getBoundingClientRect();
            const nx = r.width ? p.lx / r.width : 0.5;
            const ny = r.height ? p.ly / r.height : 0.5;
            // set CSS variables used inside styles (GPU friendly)
            el.style.setProperty("--cursor-x", `${(nx * 100).toFixed(4)}%`);
            el.style.setProperty("--cursor-y", `${(ny * 100).toFixed(4)}%`);
            // small moving shimmer offset (cosmic drift)
            const t = performance.now() / 1000;
            el.style.setProperty("--shimmer-x", `${(Math.cos(t * 0.6) * 6).toFixed(2)}px`);
            el.style.setProperty("--shimmer-y", `${(Math.sin(t * 0.7) * 6).toFixed(2)}px`);
            // aura pulsation (very subtle)
            el.style.setProperty("--aura-pulse", `${(0.95 + Math.sin(t * 1.9) * 0.04).toFixed(3)}`);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [auraIntensity]);
    const first = items[0];
    const second = items[1];
    const third = items[2];
    const fourth = items[3];
    const fifth = items[4];
    const sixth = items[5];
    const seventh = items[6];
    const eighth = items[7];
    // memoize image elements for better reuse
    const imgProps = useMemo(() => ({
        className: "object-cover w-full h-full will-change-transform",
        quality: 80,
        placeholder: undefined,
    }), []);
    return (<main ref={hostRef} onMouseMove={onMove} onMouseLeave={onLeave} className={`min-h-screen py-4 px-3 sm:py-8 sm:px-6 lg:py-16 lg:px-8 ${className}`} aria-label="Bento grid" 
    // CSS variables default (can be overridden)
    style={{
            // --cursor-x / --cursor-y set in loop
            "--aura-color-1": "rgba(163, 102, 255, 0.85)", // violet
            "--aura-color-2": "rgba(138, 75, 255, 0.65)", // deep violet
            "--aura-color-3": "rgba(162, 94, 255, 0.18)", // soft glow
            "--glow-size": "420px",
            "--aura-opacity": "0.9",
        }}>
      {/* Floating cosmic shimmer & aura layers — pointer-events-none so they never block clicks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[0] mix-blend-screen" style={{
            // use CSS vars for position
            boxShadow: "none",
        }}>
        {/* Aura layer (cursor reactive) */}
        <div className="absolute inset-0" style={{
            background: "radial-gradient(closest-side, var(--aura-color-1) 0%, transparent 35%), radial-gradient(closest-side, var(--aura-color-2) 0%, transparent 30%)",
            transform: `translate3d(calc(var(--shimmer-x, 0px) * 1.0), calc(var(--shimmer-y,0px) * 1.0), 0)`,
            opacity: "var(--aura-opacity, 0.9)",
            maskImage: "radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage: "radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)",
            filter: "blur(30px) saturate(1.08)",
            transition: "opacity 220ms linear",
            // keep on separate layer for GPU
            willChange: "transform, opacity, mask-image",
        }}/>

        {/* Ambient neon gradient (subtle) */}
        <div style={{
            position: "absolute",
            left: "10%",
            top: "6%",
            width: "30%",
            height: "40%",
            transform: "translate3d(0,0,0)",
            background: "radial-gradient(60% 60% at 30% 30%, rgba(220,180,255,0.12), rgba(255,215,245,0.02) 40%, transparent 70%)",
            filter: "blur(28px)",
            mixBlendMode: "screen",
            willChange: "transform, opacity",
        }}/>

        {/* Small floating particles (pure CSS) */}
        <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            left: "calc(var(--cursor-x,50%) - 60px)",
            top: "calc(var(--cursor-y,50%) - 60px)",
            width: "120px",
            height: "120px",
            transform: "translate3d(var(--shimmer-x,0px), var(--shimmer-y,0px), 0)",
            filter: "blur(8px)",
            opacity: 0.65,
            background: "conic-gradient(from 120deg at 50% 50%, rgba(178,120,255,0.35), rgba(138,75,255,0.25), rgba(202,150,255,0.08))",
            borderRadius: "50%",
            willChange: "transform, opacity",
        }}/>
        </div>
      </div>

      {/* grid (keeps your class names and spans identical) */}
      <div className="max-w-[1600px] mx-auto relative z-[1]">
        <section className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6 auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[220px]">
          {/* 1 */}
          {first && (<Link href={first.link || "#"} aria-label={first.title} className="relative col-span-2 md:col-span-4 lg:col-span-6 row-span-2 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={first.imageUrl || "/Poster/Bento/1.webp"} alt={first.alt ?? first.title} fill quality={90} priority loading="eager" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/1.webp") {
                    target.src = "/Poster/Bento/1.webp";
                }
            }}/>
            </Link>)}

          {/* 2 */}
          {second && (<Link href={second.link || "#"} aria-label={second.title} className="relative col-span-2 md:col-span-2 lg:col-span-3 row-span-2 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={second.imageUrl || "/Poster/Bento/2.webp"} alt={second.alt ?? second.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/2.webp") {
                    target.src = "/Poster/Bento/2.webp";
                }
            }}/>
            </Link>)}

          {/* 3 */}
          {third && (<Link href={third.link || "#"} aria-label={third.title} className="relative col-span-2 md:col-span-3 lg:col-span-3 row-span-1 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={third.imageUrl || "/Poster/Bento/3.webp"} alt={third.alt ?? third.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/3.webp") {
                    target.src = "/Poster/Bento/3.webp";
                }
            }}/>
            </Link>)}

          {/* 4 */}
          {fourth && (<Link href={fourth.link || "#"} aria-label={fourth.title} className="relative col-span-2 md:col-span-3 lg:col-span-3 row-span-1 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={fourth.imageUrl || "/Poster/Bento/4.webp"} alt={fourth.alt ?? fourth.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/4.webp") {
                    target.src = "/Poster/Bento/4.webp";
                }
            }}/>
            </Link>)}

          {/* 5 */}
          {fifth && (<Link href={fifth.link || "#"} aria-label={fifth.title} className="relative col-span-2 md:col-span-6 lg:col-span-6 row-span-1 lg:row-span-2 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={fifth.imageUrl || "/Poster/Bento/5.webp"} alt={fifth.alt ?? fifth.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/5.webp") {
                    target.src = "/Poster/Bento/5.webp";
                }
            }}/>
            </Link>)}

          {/* 6 */}
          {sixth && (<Link href={sixth.link || "#"} aria-label={sixth.title} className="relative col-span-1 md:col-span-3 lg:col-span-3 row-span-1 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={sixth.imageUrl || "/Poster/Bento/6.webp"} alt={sixth.alt ?? sixth.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 25vw, (max-width: 1024px) 50vw, 25vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/6.webp") {
                    target.src = "/Poster/Bento/6.webp";
                }
            }}/>
            </Link>)}

          {/* 7 */}
          {seventh && (<Link href={seventh.link || "#"} aria-label={seventh.title} className="relative col-span-1 md:col-span-3 lg:col-span-3 row-span-1 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={seventh.imageUrl || "/Poster/Bento/7.webp"} alt={seventh.alt ?? seventh.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 25vw, (max-width: 1024px) 50vw, 25vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/7.webp") {
                    target.src = "/Poster/Bento/7.webp";
                }
            }}/>
            </Link>)}

          {/* 8 */}
          {eighth && (<Link href={eighth.link || "#"} aria-label={eighth.title} className="relative col-span-2 md:col-span-6 lg:col-span-6 row-span-1 rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-md">
              <Image src={eighth.imageUrl || "/Poster/Bento/8.webp"} alt={eighth.alt ?? eighth.title} fill quality={90} priority={false} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw" className={imgProps.className} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                if (target.src !== "/Poster/Bento/8.webp") {
                    target.src = "/Poster/Bento/8.webp";
                }
            }}/>
            </Link>)}
        </section>
      </div>
    </main>);
}
