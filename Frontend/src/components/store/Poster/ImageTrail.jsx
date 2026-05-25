"use client";
import React, { useEffect, useRef, useCallback } from "react";
export default function ImageTrail({ images = [
    "/Poster/Posters/trail.webp",
    "/Poster/Posters/trail1.webp",
    "/Poster/Posters/trail2.webp",
], maxSprites = 18, spriteSize = 140, lifeMs = 2300, spawnEveryPx = 85, inertia = 0.07, headline = "Where Elegance Follows You.", subline = "Every move paints a whisper of luxury — calm, subtle, and alive.", }) {
    const heroRef = useRef(null);
    const poolRef = useRef(null);
    const spritesRef = useRef([]);
    const nextIdxRef = useRef(0);
    const cursorPosRef = useRef({ x: 0, y: 0 });
    const smoothedPosRef = useRef({ x: 0, y: 0 });
    const lastSpawnRef = useRef(0);
    const rectRef = useRef(null);
    const rafRef = useRef(null);
    const lerp = (a, b, t) => a + (b - a) * t;
    const updateBounds = useCallback(() => {
        if (heroRef.current)
            rectRef.current = heroRef.current.getBoundingClientRect();
    }, []);
    const animate = useCallback(() => {
        smoothedPosRef.current.x = lerp(smoothedPosRef.current.x, cursorPosRef.current.x, inertia);
        smoothedPosRef.current.y = lerp(smoothedPosRef.current.y, cursorPosRef.current.y, inertia);
        rafRef.current = requestAnimationFrame(animate);
    }, [inertia]);
    useEffect(() => {
        updateBounds();
        window.addEventListener("resize", updateBounds);
        window.addEventListener("scroll", updateBounds, { passive: true });
        const container = document.createElement("div");
        Object.assign(container.style, {
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            overflow: "hidden",
            contain: "layout paint",
            zIndex: "1",
        });
        heroRef.current?.appendChild(container);
        poolRef.current = container;
        for (let i = 0; i < maxSprites; i++) {
            const spr = document.createElement("div");
            Object.assign(spr.style, {
                position: "absolute",
                left: "-9999px",
                width: `${spriteSize}px`,
                height: `${spriteSize}px`,
                opacity: "0",
                borderRadius: "18px",
                overflow: "hidden",
                transform: "translate3d(0,0,0)",
                transition: "transform 1.4s ease-out, opacity 1.4s ease-out",
                willChange: "transform, opacity",
            });
            const img = document.createElement("img");
            Object.assign(img.style, {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "translateZ(0)",
                filter: "brightness(1.1) contrast(1.05)",
            });
            spr.appendChild(img);
            container.appendChild(spr);
            spritesRef.current.push({ el: spr, img });
        }
        const getNextSprite = () => {
            const idx = nextIdxRef.current;
            nextIdxRef.current = (idx + 1) % spritesRef.current.length;
            return spritesRef.current[idx];
        };
        const spawnAt = (x, y) => {
            const now = performance.now();
            if (now - lastSpawnRef.current < 90)
                return;
            lastSpawnRef.current = now;
            const rect = rectRef.current;
            if (!rect || !poolRef.current)
                return;
            const clampedX = Math.max(rect.left + spriteSize / 2, Math.min(x, rect.right - spriteSize / 2));
            const clampedY = Math.max(rect.top + spriteSize / 2, Math.min(y, rect.bottom - spriteSize / 2));
            const { el: sprite, img } = getNextSprite();
            const randomImg = images[Math.floor(Math.random() * images.length)];
            img.src = randomImg;
            const size = spriteSize * (0.9 + Math.random() * 0.2);
            sprite.style.width = `${size}px`;
            sprite.style.height = `${size}px`;
            sprite.style.left = `${clampedX - rect.left - size / 2}px`;
            sprite.style.top = `${clampedY - rect.top - size / 2}px`;
            sprite.style.opacity = "0.9";
            sprite.style.transform = `translate3d(0, 0, 0) scale(1.05)`;
            requestAnimationFrame(() => {
                sprite.style.opacity = "1";
                sprite.style.transform = `translate3d(0, -20px, 0) scale(1.1)`;
            });
            setTimeout(() => {
                sprite.style.opacity = "0";
                sprite.style.transform = `translate3d(0, -60px, 0) scale(0.9)`;
            }, lifeMs - 400);
            setTimeout(() => {
                sprite.style.left = "-9999px";
            }, lifeMs + 600);
        };
        const handleMove = (e) => {
            cursorPosRef.current = { x: e.clientX, y: e.clientY };
            spawnAt(smoothedPosRef.current.x, smoothedPosRef.current.y);
        };
        window.addEventListener("pointermove", handleMove, { passive: true });
        animate();
        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("resize", updateBounds);
            window.removeEventListener("scroll", updateBounds);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            // Safely remove container if it exists and is still in the DOM
            if (container && container.parentNode) {
                try {
                    container.remove();
                }
                catch (e) {
                    // Container already removed
                    console.debug('ImageTrail container cleanup:', e);
                }
            }
        };
    }, [images, maxSprites, spriteSize, lifeMs, inertia, animate, updateBounds]);
    return (<section className="trail-hero" ref={heroRef}>
      <div className="trail-content">
        <h1>{headline}</h1>
        <p>{subline}</p>
      </div>

      <style>{`
        .trail-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(145deg, #fffaf5 0%, #fdf2e8 50%, #fff6ef 100%);
          isolation: isolate;
        }

        .trail-content {
          position: relative;
          z-index: 5;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border-radius: 24px;
          padding: 4rem 5rem;
          max-width: 850px;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        h1 {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.5rem, 4vw, 4.2rem);
          background: linear-gradient(120deg, #d8b385, #e9cda3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        p {
          font-family: "Lato", sans-serif;
          font-size: clamp(1rem, 1.2vw, 1.3rem);
          color: #444;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .trail-content {
            padding: 2.5rem;
          }
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>);
}
