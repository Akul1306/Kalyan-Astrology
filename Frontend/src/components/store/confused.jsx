"use client";
import React from "react";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
const playfair = Playfair_Display({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
});
const inter = Inter({ subsets: ["latin"], display: "swap" });
export default function Confused({ title, subtitle, imageSrc, ctaText = "View Buying Guides", onCtaClick, height = "15vh", className, overlayAlpha = 0.32, showArrow = true, }) {
    return (<section aria-label={title} className={[
            "group relative w-full overflow-hidden rounded-lg", // rounded; adjust if you want pill corners
            className || "",
        ].join(" ")} style={{ minHeight: height, height }}>
      {/* Background image (cover) */}
      <div className="absolute inset-0 -z-10">
        <Image src={imageSrc || "/placeholder.png"} alt={title} fill quality={85} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1600px" priority={false} loading="lazy" className="object-cover object-right" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (target.src !== "/placeholder.png") {
                target.src = "/placeholder.png";
            }
        }}/>
      </div>

      {/* Soft overlay for contrast */}
      <div aria-hidden className="absolute inset-0 -z-5" style={{
            background: `linear-gradient(90deg, rgba(0,0,0,${overlayAlpha}) 0%, rgba(0,0,0,${overlayAlpha * 0.35}) 45%, rgba(0,0,0,0) 100%)`,
            mixBlendMode: "normal",
        }}/>

      {/* Optional subtle grain / texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-4 opacity-5" style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='f'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23fff' filter='url(%23f)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "220px 220px",
        }}/>

      {/* Content row */}
      <div className="relative z-10 flex h-full w-full items-center justify-between px-6 md:px-10">
        {/* Left text block */}
        <div className="max-w-[66%]">
          <h2 className={`${playfair.className} text-white text-[clamp(18px,3.2vw,34px)] leading-tight`} style={{ textShadow: "0 6px 18px rgba(0,0,0,0.35)" }}>
            {title}
          </h2>
          {subtitle && (<p className={`${inter.className} mt-1 text-white text-sm opacity-90`} style={{ textShadow: "0 6px 18px rgba(0,0,0,0.22)" }}>
              {subtitle}
            </p>)}
        </div>

        {/* CTA pill */}
        <div className="flex-shrink-0">
          <button onClick={onCtaClick} className={`${inter.className} inline-flex items-center gap-4 rounded-full bg-[#6b1313] px-6 py-3 text-white shadow-lg transition hover:translate-y-[-2px] hover:shadow-2xl active:translate-y-0`} aria-label={ctaText} style={{ boxShadow: "0 8px 28px rgba(107,19,19,0.28)" }}>
            <span className="font-medium">{ctaText}</span>

            {showArrow && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="opacity-95">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>)}
          </button>
        </div>
      </div>
    </section>);
}
