"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { Maximize2, Volume2, VolumeX } from "lucide-react";
export default function ProductCarousel({ items, aspect = 1, className, }) {
    const [index, setIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    const fsRef = useRef(null);
    const hasItems = Array.isArray(items) && items.length > 0;
    const clampedIndex = hasItems ? Math.min(index, items.length - 1) : 0;
    const current = hasItems ? items[clampedIndex] : null;
    // Fullscreen open
    const openFs = async () => {
        if (!fsRef.current)
            return;
        if (!document.fullscreenElement) {
            await fsRef.current.requestFullscreen?.();
        }
    };
    // Keyboard navigation in fullscreen
    useEffect(() => {
        const onKey = (e) => {
            if (!document.fullscreenElement)
                return;
            if (e.key === "ArrowRight") {
                setIndex((i) => Math.min(items.length - 1, i + 1));
            }
            if (e.key === "ArrowLeft") {
                setIndex((i) => Math.max(0, i - 1));
            }
            if (e.key === "Escape") {
                document.exitFullscreen?.();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [items.length]);
    // Preload previous/next images for instant switch
    const neighbors = useMemo(() => {
        const prev = Math.max(0, index - 1);
        const next = Math.min(items.length - 1, index + 1);
        return [prev, next];
    }, [index, items.length]);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        neighbors.forEach((i) => {
            const m = items[i];
            if (m?.kind === "image") {
                const img = new window.Image();
                img.src = m.src;
            }
        });
    }, [neighbors, items]);
    const renderMedia = useCallback((m, priority = false) => m.kind === "image" ? (<Image key={m.src} src={m.src || "/placeholder.png"} alt={m.alt || "Product image"} fill quality={90} priority={priority} loading={priority ? "eager" : "lazy"} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px" className="h-full w-full object-contain md:object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (target.src !== "/placeholder.png") {
                target.src = "/placeholder.png";
            }
        }}/>) : (<video key={m.src} src={m.src} poster={m.poster} muted={muted} loop playsInline autoPlay className="h-full w-full object-cover"/>), [muted]);
    return (<div className={["w-full", className || ""].join(" ")}>
      {/* MAIN VIEWER */}
      <div ref={fsRef} className="
          group relative w-full overflow-hidden
          rounded-xl border border-gray-100 bg-white
          shadow-sm flex items-center justify-center
        " style={{ aspectRatio: String(aspect) }}>
        {current ? (renderMedia(current, true)) : (<div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            No media available
          </div>)}

        {/* Controls (fullscreen + mute) */}
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          {current && current.kind === "video" && (<button onClick={() => setMuted((m) => !m)} className="rounded-md bg-white/90 p-2 shadow hover:bg-white transition-colors" aria-label={muted ? "Unmute video" : "Mute video"}>
              {muted ? (<VolumeX className="h-4 w-4 text-gray-700"/>) : (<Volume2 className="h-4 w-4 text-gray-700"/>)}
            </button>)}
          <button onClick={openFs} className="rounded-md bg-white/90 p-2 shadow hover:bg-white transition-colors" aria-label="Fullscreen">
            <Maximize2 className="h-4 w-4 text-gray-700"/>
          </button>
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
        {items.map((m, i) => (<button key={i} onClick={() => setIndex(i)} className={[
                "relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg border transition-all duration-300",
                i === index
                    ? "border-yellow-500 shadow-md"
                    : "border-gray-200 hover:border-yellow-300",
            ].join(" ")} aria-label={`media ${i + 1}`}>
            {m.kind === "image" ? (<Image src={m.src} alt={m.alt || "thumbnail"} fill sizes="80px" className="object-cover transition-transform duration-300 hover:scale-105"/>) : (<>
                <video src={m.src} muted playsInline className="h-full w-full object-cover"/>
                <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  VIDEO
                </span>
              </>)}
          </button>))}
      </div>
    </div>);
}
