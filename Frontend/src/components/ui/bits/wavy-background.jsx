"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
export const WavyBackground = ({ children, className, containerClassName, colors, waveWidth, backgroundFill, blur = 10, speed = "fast", waveOpacity = 0.5, ...props }) => {
    const noise = useMemo(() => createNoise3D(), []);
    const canvasRef = useRef(null);
    const animationIdRef = useRef(null);
    const speedIncrement = useMemo(() => {
        switch (speed) {
            case "fast":
                return 0.002;
            case "slow":
            default:
                return 0.001;
        }
    }, [speed]);
    const waveColors = useMemo(() => colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
    ], [colors]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const shouldReduceMotion = prefersReducedMotion.matches;
        let w = (ctx.canvas.width = window.innerWidth);
        let h = (ctx.canvas.height = window.innerHeight);
        ctx.filter = `blur(${blur}px)`;
        let nt = 0;
        const handleResize = () => {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
        };
        const drawWave = (n) => {
            nt += speedIncrement;
            for (let i = 0; i < n; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth || 50;
                ctx.strokeStyle = waveColors[i % waveColors.length];
                for (let x = 0; x < w; x += 5) {
                    const y = noise(x / 800, 0.3 * i, nt) * 100;
                    ctx.lineTo(x, y + h * 0.5);
                }
                ctx.stroke();
                ctx.closePath();
            }
        };
        let isMounted = true;
        const render = () => {
            if (!isMounted)
                return;
            ctx.fillStyle = backgroundFill || "white";
            ctx.globalAlpha = waveOpacity || 0.5;
            ctx.fillRect(0, 0, w, h);
            drawWave(5);
            animationIdRef.current = requestAnimationFrame(render);
        };
        window.addEventListener("resize", handleResize);
        const start = () => {
            if (animationIdRef.current !== null) {
                cancelAnimationFrame(animationIdRef.current);
            }
            nt = 0;
            render();
        };
        const stop = () => {
            if (animationIdRef.current !== null) {
                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;
            }
            ctx.fillStyle = backgroundFill || "white";
            ctx.globalAlpha = waveOpacity || 0.5;
            ctx.fillRect(0, 0, w, h);
        };
        if (shouldReduceMotion) {
            stop();
        }
        else {
            start();
        }
        const handlePrefChange = (event) => {
            if (event.matches) {
                stop();
            }
            else {
                start();
            }
        };
        if (typeof prefersReducedMotion.addEventListener === "function") {
            prefersReducedMotion.addEventListener("change", handlePrefChange);
        }
        else if (typeof prefersReducedMotion.addListener === "function") {
            prefersReducedMotion.addListener(handlePrefChange);
        }
        return () => {
            isMounted = false;
            if (animationIdRef.current !== null) {
                cancelAnimationFrame(animationIdRef.current);
            }
            window.removeEventListener("resize", handleResize);
            if (typeof prefersReducedMotion.removeEventListener === "function") {
                prefersReducedMotion.removeEventListener("change", handlePrefChange);
            }
            else if (typeof prefersReducedMotion.removeListener === "function") {
                prefersReducedMotion.removeListener(handlePrefChange);
            }
        };
    }, [backgroundFill, blur, noise, speedIncrement, waveColors, waveOpacity, waveWidth]);
    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        // I'm sorry but i have got to support it on safari.
        setIsSafari(typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome"));
    }, []);
    return (<div className={cn("h-screen flex flex-col items-center justify-center", containerClassName)}>
      <canvas className="absolute inset-0 z-0" ref={canvasRef} id="canvas" style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>);
};
