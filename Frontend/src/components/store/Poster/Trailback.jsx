"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
const Iridescence = dynamic(() => import("@/components/ui/bits/Iridescence"), {
    ssr: false,
});
const ImageTrail = dynamic(() => import("@/components/ui/bits/ImageTrail"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 z-[2]"/>,
});
export default function Trailback() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return (<section className="relative mx-auto my-12 w-[95%] h-[620px] overflow-hidden rounded-[3rem]
                 shadow-[0_6px_30px_rgba(0,0,0,0.06)]
                 bg-gradient-to-br from-[#fff8f3] via-[#f5ece5] to-[#fdf9f6]
                 will-change-transform">
      {/* Base iridescent wallpaper */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Iridescence color={[1, 1, 1]} mouseReact={false} amplitude={0.15} speed={0.6}/>
      </div>

      {/* Image Trail must receive events -> pointer-events-auto */}
      {isClient && (<div className="absolute inset-0 z-[2] pointer-events-auto" style={{ transform: "translateZ(0)", willChange: "transform" }}>
          <ImageTrail items={[
                "/Poster/Posters/pos1.webp",
                "/Poster/Posters/pos2.webp",
                "/Poster/Posters/pos3.webp",
                "/Poster/Posters/pos4.webp",
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos6.webp",
            ]} variant={1}/>
        </div>)}

      {/* Top poster should NOT block events -> pointer-events-none */}
      <div className="relative z-[3] flex h-full items-center justify-center pointer-events-none">
        <div className="relative w-[70%] aspect-[16/9]">
          <Image src="/Poster/Posters/postertext.png" alt="Poster" fill quality={90} priority loading="eager" sizes="(max-width: 640px) 100vw, (max-width: 1200px) 80vw, 70vw" className="object-cover" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            target.style.display = "none";
        }}/>
        </div>
      </div>
    </section>);
}
