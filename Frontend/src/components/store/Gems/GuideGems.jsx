"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});
const inter = Inter({ subsets: ["latin"], display: "swap" });
export default function HeroGemContact({ imageSrc, title = "Shop by Profession", subtitle = "If you are confused which gem to choose — we can help.", ctaText = "Contact Us", ctaHref = "/contact", height = "min-h-[50vh]", className = "", }) {
    return (<header aria-label="Hero contact banner" className={`relative w-full overflow-hidden ${height} ${className}`}>
      {/* ✅ Full-cover background image */}
      <div className="absolute inset-0">
        <Image src={imageSrc || "/Gems/Gems-confused.webp"} alt={typeof title === "string" ? title : "Hero background"} fill priority sizes="100vw" quality={85} loading="eager" className="object-cover object-center w-full h-full" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (target.src !== "/Gems/Gems-confused.webp") {
                target.src = "/Gems/Gems-confused.webp";
            }
        }}/>
        {/* Overlay gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/40 mix-blend-normal"/>
      </div>

      {/* ✅ Center content (width 90%) */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="w-[90%] max-w-6xl mx-auto">
          {/* Title */}
          <h1 id="hero-title" className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-semibold text-black/90 leading-tight tracking-tight`}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className={`${inter.className} mt-4 text-base md:text-lg text-black/75 max-w-3xl mx-auto`}>
            {subtitle}
          </p>

          {/* ✅ CTA Button */}
          <div className="mt-8 flex justify-center">
            {ctaHref.startsWith("http") ||
            ctaHref.startsWith("mailto:") ||
            ctaHref.startsWith("tel:") ? (<a href={ctaHref} className="px-8 py-3 bg-black text-white text-sm md:text-base font-medium tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px]">
                {ctaText}
              </a>) : (<Link href={ctaHref}>
                <button type="button" className="px-8 py-3 bg-black text-white text-sm md:text-base font-medium tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px]">
                  {ctaText}
                </button>
              </Link>)}
          </div>
        </div>
      </div>

      {/* ✅ Extra responsive tuning */}
      <style>{`
        header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        header :global(img) {
          image-rendering: auto;
        }

        @media (max-width: 640px) {
          header {
            min-height: 35vh;
          }

          h1 {
            font-size: 1.8rem !important;
          }

          p {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </header>);
}
