"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export function D3SvgViewer({ svgString }) {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const [zoomState, setZoomState] = useState(1);

    useEffect(() => {
        if (!containerRef.current || !svgString) return;

        // 1. Parse raw SVG string
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, "image/svg+xml");
        const parsedSvg = doc.querySelector("svg");

        if (!parsedSvg) {
            console.error("Failed to parse fetched SVG");
            containerRef.current.innerHTML = `<div class="text-xs text-red-500 border border-red-100 p-4 rounded-xl">Invalid chart image SVG received from AI</div>`;
            return;
        }

        // 2. Clean previous rendering
        containerRef.current.innerHTML = "";

        // 3. Set standard responsive attributes
        parsedSvg.setAttribute("width", "100%");
        parsedSvg.setAttribute("height", "100%");
        if (!parsedSvg.getAttribute("viewBox")) {
            parsedSvg.setAttribute("viewBox", "0 0 400 400"); // Standard default aspect ratio if missing
        }

        // Apply a premium theme layer directly to SVG elements using D3
        const svgEl = d3.select(parsedSvg);
        
        // Add subtle shadows, make lines crisper, color styling overrides to match theme
        svgEl.selectAll("line").attr("stroke-width", "1.5");
        svgEl.selectAll("text")
            .style("font-family", "monospace")
            .style("font-weight", "600");

        // 4. Inject parsed SVG element into our container
        containerRef.current.appendChild(parsedSvg);

        // 5. Setup D3 Zoom & Pan Behavior
        const innerSvg = d3.select(containerRef.current).select("svg");
        const gElement = innerSvg.select("g").node() ? innerSvg.select("g") : innerSvg.selectAll("*");

        const zoomBehavior = d3.zoom()
            .scaleExtent([0.5, 4])
            .on("zoom", (event) => {
                // If there's an main 'g' element, transform it, otherwise transform all child nodes
                if (innerSvg.select("g").node()) {
                    innerSvg.select("g").attr("transform", event.transform);
                } else {
                    innerSvg.selectAll("g, line, rect, path, text, circle").attr("transform", event.transform);
                }
                setZoomState(event.transform.k);
            });

        innerSvg.call(zoomBehavior);
        svgRef.current = { innerSvg, zoomBehavior };

        return () => {
            innerSvg.on(".zoom", null);
        };
    }, [svgString]);

    // Zoom Handlers
    const handleZoomIn = () => {
        if (!svgRef.current) return;
        const { innerSvg, zoomBehavior } = svgRef.current;
        innerSvg.transition().duration(250).call(zoomBehavior.scaleBy, 1.3);
    };

    const handleZoomOut = () => {
        if (!svgRef.current) return;
        const { innerSvg, zoomBehavior } = svgRef.current;
        innerSvg.transition().duration(250).call(zoomBehavior.scaleBy, 0.7);
    };

    const handleReset = () => {
        if (!svgRef.current) return;
        const { innerSvg, zoomBehavior } = svgRef.current;
        innerSvg.transition().duration(300).call(zoomBehavior.transform, d3.zoomIdentity);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Interactive Control Panel */}
            <div className="flex items-center gap-1.5 mb-4 bg-white/80 dark:bg-neutral-900 border border-yellow-100/50 dark:border-neutral-800/80 px-3 py-1.5 rounded-full shadow-sm z-20">
                <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="p-1.5 text-gray-600 dark:text-neutral-300 hover:text-yellow-500 hover:bg-yellow-50/50 dark:hover:bg-neutral-800 rounded-full transition-all cursor-pointer"
                >
                    <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="p-1.5 text-gray-600 dark:text-neutral-300 hover:text-yellow-500 hover:bg-yellow-50/50 dark:hover:bg-neutral-800 rounded-full transition-all cursor-pointer"
                >
                    <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={handleReset}
                    title="Reset Chart Position"
                    className="p-1.5 text-gray-600 dark:text-neutral-300 hover:text-yellow-500 hover:bg-yellow-50/50 dark:hover:bg-neutral-800 rounded-full transition-all cursor-pointer border-l border-gray-100 dark:border-neutral-800 pl-2.5 ml-1"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <span className="text-[9px] font-bold font-mono text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 px-2 py-0.5 rounded-full ml-1 uppercase">
                    {Math.round(zoomState * 100)}%
                </span>
            </div>

            {/* SVG Visual Display */}
            <div 
                ref={containerRef} 
                className="w-full aspect-square max-w-[340px] sm:max-w-[420px] mx-auto bg-gradient-to-b from-yellow-50/10 to-yellow-50/20 border border-yellow-100/80 dark:border-neutral-800/60 rounded-3xl p-4 sm:p-6 shadow-inner relative overflow-hidden flex items-center justify-center cursor-move select-none"
                style={{ touchAction: "none" }}
            />
            
            <p className="text-[9px] text-gray-400 mt-2.5 font-mono uppercase tracking-widest text-center">
                ✨ Tip: Pinch / Scroll to zoom • Drag to pan
            </p>
        </div>
    );
}

export default D3SvgViewer;
