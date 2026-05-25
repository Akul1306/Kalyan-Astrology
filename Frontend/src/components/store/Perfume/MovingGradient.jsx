"use client";
import React, { useEffect, useRef } from "react";
/**
 * MovingGradient
 * - Pastel peach -> yellow luxury background
 * - Smooth cursor-follow inertia (lerp)
 * - Light GPU-friendly animations (blur, transforms)
 * - Minimal DOM writes: updates CSS variables on a single container element
 * - Tunable: particles, orbs, speeds
 */
export default function MovingGradient() {
    const containerRef = useRef(null);
    // config
    const LERP = 0.08; // smoothing (lower = more delay)
    const ORB_COUNT = 4; // large blurred orbs
    const PARTICLE_COUNT = 28; // small dust particles (keeps CPU/GPU low)
    const PARTICLE_SEED = useRef([]);
    // safe init seed
    useEffect(() => {
        PARTICLE_SEED.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => Math.sin(i * 12.9898 + 78.233) * 43758.5453).map((v) => (v - Math.floor(v)) * 1000);
    }, []);
    useEffect(() => {
        const el = containerRef.current;
        if (!el)
            return;
        // initial CSS vars
        el.style.setProperty("--mx", "50"); // mouse x in %
        el.style.setProperty("--my", "50"); // mouse y in %
        el.style.setProperty("--t-mx", "50"); // target
        el.style.setProperty("--t-my", "50");
        el.style.setProperty("--v-scale", "1");
        // keep target & current in refs to avoid re-renders
        let targetX = 50;
        let targetY = 50;
        let curX = 50;
        let curY = 50;
        let last = performance.now();
        let raf = 0;
        function onMouseMove(e) {
            targetX = (e.clientX / window.innerWidth) * 100;
            targetY = (e.clientY / window.innerHeight) * 100;
            // damp scale slightly when moving fast
            const dx = Math.abs(targetX - curX);
            const dy = Math.abs(targetY - curY);
            const v = Math.min(1.08, 1 + Math.max(dx, dy) * 0.006);
            el.style.setProperty("--v-scale", String(v));
        }
        function onTouchMove(e) {
            const t = e.touches[0];
            if (!t)
                return;
            targetX = (t.clientX / window.innerWidth) * 100;
            targetY = (t.clientY / window.innerHeight) * 100;
        }
        function animate(now) {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            // lerp current toward target
            curX += (targetX - curX) * LERP;
            curY += (targetY - curY) * LERP;
            // update css vars (single DOM write per frame)
            el.style.setProperty("--mx", String(curX));
            el.style.setProperty("--my", String(curY));
            // subtle slow drift for orbs
            el.style.setProperty("--time", String(now * 0.001));
            raf = requestAnimationFrame(animate);
        }
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        raf = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, []);
    // helper render: orbs & particles (positions calculated in CSS using --mx/--my and --time)
    // keep markup minimal; heavy work is inside CSS transforms using variables
    return (<>
      <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none" aria-hidden="true">
        {/* base soft gradient */}
        <div className="absolute inset-0" style={{
            background: "linear-gradient(120deg, #fff6f1 0%, #fff3e9 30%, #fff9ee 60%, #fffdf7 100%)",
            willChange: "transform, opacity",
        }}/>

        {/* moving large orbs */}
        <div className="absolute inset-0" style={{
            // composite layer: uses CSS variables for positioning
            // we create 4 blurred orbs using pseudo-like divs
            pointerEvents: "none",
        }}>
          {/* Orb 1 */}
          <div style={{
            position: "absolute",
            width: "640px",
            height: "640px",
            left: "calc(var(--mx,50) * 1% - 320px + sin(var(--time,0)/5.0)*20px)",
            top: "calc(var(--my,50) * 1% - 320px + cos(var(--time,0)/6.5)*18px)",
            background: "radial-gradient(circle at 30% 30%, rgba(255,183,140,0.45) 0%, rgba(255,210,180,0.22) 40%, rgba(255,240,230,0.02) 70%, transparent 100%)",
            filter: "blur(32px)",
            transform: "translate3d(0,0,0)",
            willChange: "transform, left, top",
        }}/>
          {/* Orb 2 */}
          <div style={{
            position: "absolute",
            width: "760px",
            height: "760px",
            left: "calc( (95% - var(--mx,50)% * 0.7) - 380px + sin(var(--time,0)/6.7)*12px )",
            top: "calc( (10% + var(--my,50)% * 0.2) - 380px + cos(var(--time,0)/7.2)*22px )",
            background: "radial-gradient(circle at 40% 40%, rgba(255,165,140,0.38) 0%, rgba(255,205,175,0.22) 45%, transparent 80%)",
            filter: "blur(36px)",
            willChange: "transform, left, top",
        }}/>
          {/* Orb 3 */}
          <div style={{
            position: "absolute",
            width: "540px",
            height: "540px",
            left: "calc( (20% + var(--mx,50)% * 0.3) - 270px + sin(var(--time,0)/8.2)*8px )",
            top: "calc( (60% - var(--my,50)% * 0.2) - 270px + cos(var(--time,0)/5.1)*15px )",
            background: "radial-gradient(circle at 50% 50%, rgba(255,190,160,0.34) 0%, rgba(255,220,200,0.18) 60%, transparent 90%)",
            filter: "blur(28px)",
            willChange: "transform, left, top",
        }}/>
          {/* Orb 4 */}
          <div style={{
            position: "absolute",
            width: "480px",
            height: "480px",
            left: "calc( (70% - var(--mx,50)% * 0.15) - 240px + cos(var(--time,0)/9.5)*10px )",
            top: "calc( (30% + var(--my,50)% * 0.12) - 240px + sin(var(--time,0)/6.3)*12px )",
            background: "radial-gradient(circle at 40% 40%, rgba(255,175,150,0.32) 0%, rgba(255,200,175,0.16) 60%, transparent 94%)",
            filter: "blur(30px)",
            willChange: "transform, left, top",
        }}/>
        </div>

        {/* floating particles (small dust) */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const seed = PARTICLE_SEED.current[i] ?? i * 37;
            // distribute particles in grid-ish positions, but we won't update them per-frame via React
            const left = ((seed * 31.7) % 100).toFixed(2) + "%";
            const top = ((seed * 73.1) % 100).toFixed(2) + "%";
            const size = 1 + ((seed * 13.3) % 3); // 1-3px
            const hueShift = Math.floor((seed * 17.3) % 20) - 10;
            const delay = (seed % 20) / 10;
            return (<div key={i} style={{
                    position: "absolute",
                    left,
                    top,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: "999px",
                    background: `radial-gradient(circle, rgba(255,190,150,${0.55 - (size * 0.12)}) 0%, transparent 70%)`,
                    filter: "blur(0.6px)",
                    transform: `translate3d(0,0,0)`,
                    animation: `mv-p-${(i % 5) + 1} ${20 + (i % 12)}s linear ${-delay}s infinite`,
                    willChange: "transform, opacity",
                    opacity: 0.95,
                }}/>);
        })}
        </div>

        {/* subtle grain overlay */}
        <div style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            pointerEvents: "none",
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' fill='rgba(0,0,0,0.03)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "220px 220px",
        }}/>
      </div>

      <style>{`
        /* small particle motion keyframes (kept lightweight) */
        @keyframes mv-p-1 {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          8% { opacity: 1; }
          50% { transform: translate3d(8px,-6px,0) scale(1.15); opacity: 0.95; }
          100% { transform: translate3d(-6px,8px,0) scale(0.95); opacity: 0; }
        }
        @keyframes mv-p-2 {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate3d(-10px,6px,0) scale(1.1); opacity: 0.95; }
          100% { transform: translate3d(6px,-10px,0) scale(0.9); opacity: 0; }
        }
        @keyframes mv-p-3 {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          7% { opacity: 1; }
          50% { transform: translate3d(14px,6px,0) scale(1.2); opacity: 0.95; }
          100% { transform: translate3d(-10px,-6px,0) scale(0.9); opacity: 0; }
        }
        @keyframes mv-p-4 {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          9% { opacity: 1; }
          50% { transform: translate3d(-8px,14px,0) scale(1.05); opacity: 0.95; }
          100% { transform: translate3d(6px,-12px,0) scale(0.92); opacity: 0; }
        }
        @keyframes mv-p-5 {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          6% { opacity: 1; }
          50% { transform: translate3d(10px,-4px,0) scale(1.08); opacity: 0.95; }
          100% { transform: translate3d(-8px,10px,0) scale(0.9); opacity: 0; }
        }

        /* subtle responsive tweaks */
        @media (max-width: 640px) {
          div[ref] { /* noop - keep minimal */ }
        }
      `}</style>
    </>);
}
