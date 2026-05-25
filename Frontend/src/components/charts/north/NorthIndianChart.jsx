"use client";
import React from "react";

// Planet colors matching traditional aesthetics
const planetColors = {
    Sun: "#B45309",
    Moon: "#1D4ED8",
    Mars: "#DC2626",
    Mercury: "#059669",
    Jupiter: "#7C3AED",
    Venus: "#DB2777",
    Saturn: "#4B5563",
    Rahu: "#4F46E5",
    Ketu: "#312E81",
};

// Lowercase abbreviations mapping as requested
const planetAbbr = {
    Sun: "su", Moon: "mo", Mercury: "me", Venus: "ve", Mars: "ma",
    Jupiter: "ju", Saturn: "sa", Rahu: "ra", Ketu: "ke"
};

// Traditional default planets setup (Lagna in Aries)
const defaultPlanets = [
    { name: "Rahu", house: 1 },
    { name: "Sun", house: 2 },
    { name: "Mercury", house: 3 },
    { name: "Venus", house: 3 },
    { name: "Saturn", house: 4 },
    { name: "Mars", house: 5 },
    { name: "Ketu", house: 7 },
    { name: "Jupiter", house: 9 },
    { name: "Moon", house: 11 },
];

export function NorthIndianChart({ planets = defaultPlanets, ascendantNumber = 1 }) {
    // Group planets by house (1-indexed)
    const planetsByHouse = planets.reduce((acc, p) => {
        const h = p.house || 1;
        if (!acc[h]) acc[h] = [];
        acc[h].push(p);
        return acc;
    }, {});

    // Utility to get the dynamic Rashi (zodiac sign) number printed in each house
    const getRashiForHouse = (houseNumber) => {
        let r = (ascendantNumber + houseNumber - 1) % 12;
        return r === 0 ? 12 : r;
    };

    // Label and planet rows coordinates for the 12 houses (pixel-perfect matching)
    const houseCoords = {
        1: { rx: 250, ry: 95, px: 250, py: 135 },
        2: { rx: 145, ry: 75, px: 145, py: 105 },
        3: { rx: 80, ry: 140, px: 80, py: 170 },
        4: { rx: 100, ry: 245, px: 135, py: 245 },
        5: { rx: 80, ry: 360, px: 80, py: 330 },
        6: { rx: 145, ry: 425, px: 145, py: 395 },
        7: { rx: 250, ry: 405, px: 250, py: 365 },
        8: { rx: 355, ry: 425, px: 355, py: 395 },
        9: { rx: 420, ry: 360, px: 420, py: 330 },
        10: { rx: 400, ry: 245, px: 365, py: 245 },
        11: { rx: 420, ry: 140, px: 420, py: 170 },
        12: { rx: 355, ry: 75, px: 355, py: 105 },
    };

    // Render horizontal list of color-coded planet abbreviations in each house
    const renderPlanets = (houseNum, x, y) => {
        const list = planetsByHouse[houseNum] || [];
        if (list.length === 0) return null;
        
        return (
            <text x={x} y={y} textAnchor="middle" className="font-mono text-[11px] font-bold">
                {list.map((p, idx) => {
                    const name = p.name || p.planet || "";
                    const abbr = planetAbbr[name] || name.substring(0, 2).toLowerCase();
                    const color = planetColors[name] || "#4B5563";
                    
                    return (
                        <tspan key={idx} dx={idx > 0 ? 8 : 0} fill={color}>
                            {abbr}
                        </tspan>
                    );
                })}
            </text>
        );
    };

    return (
        <div className="flex items-center justify-center w-full">
            <svg viewBox="0 0 500 500" className="w-full max-w-[420px] h-auto shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl">
                {/* Traditional Background Peach/Amber Color */}
                <rect x="0" y="0" width="500" height="500" fill="#FED7AA" stroke="#9A3412" strokeWidth="4" />

                {/* 12 Houses Paths connecting Diagonals and Central Diamond Midpoints */}
                {/* Center is at (250, 250), outer border is at 40 and 460. Midpoints: 250, 40 and 250, 460 and 40, 250 and 460, 250 */}
                {/* Intersections: (145, 145), (355, 145), (145, 355), (355, 355) */}
                
                {/* House 1 - Top Center Diamond */}
                <path d="M 250 250 L 145 145 L 250 40 L 355 145 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
                
                {/* House 2 - Top Left Triangle */}
                <path d="M 40 40 L 250 40 L 145 145 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 3 - Left Outer Triangle */}
                <path d="M 40 40 L 145 145 L 40 250 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 4 - Left Center Diamond */}
                <path d="M 250 250 L 145 145 L 40 250 L 145 355 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />

                {/* House 5 - Bottom Left Outer Triangle */}
                <path d="M 40 460 L 40 250 L 145 355 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 6 - Bottom Left Triangle */}
                <path d="M 40 460 L 145 355 L 250 460 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 7 - Bottom Center Diamond */}
                <path d="M 250 250 L 145 355 L 250 460 L 355 355 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />

                {/* House 8 - Bottom Right Triangle */}
                <path d="M 460 460 L 250 460 L 355 355 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 9 - Bottom Right Outer Triangle */}
                <path d="M 460 460 L 355 355 L 460 250 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 10 - Right Center Diamond */}
                <path d="M 250 250 L 355 355 L 460 250 L 355 145 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />

                {/* House 11 - Top Right Outer Triangle */}
                <path d="M 460 40 L 460 250 L 355 145 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* House 12 - Top Right Triangle */}
                <path d="M 460 40 L 250 40 L 355 145 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

                {/* Outer frame borders */}
                <rect x="40" y="40" width="420" height="420" fill="none" stroke="#9A3412" strokeWidth="3.5" />
                <rect x="44" y="44" width="412" height="412" fill="none" stroke="#FDBA74" strokeWidth="1" opacity="0.4" />

                {/* Center dot */}
                <circle cx="250" cy="250" r="5" fill="#7C2D12" />

                {/* Render Rashi numbers (correctly computed from Ascendant) */}
                {Object.keys(houseCoords).map((h) => {
                    const houseNum = parseInt(h, 10);
                    const rashi = getRashiForHouse(houseNum);
                    const coords = houseCoords[houseNum];
                    
                    return (
                        <text
                            key={`rashi-${houseNum}`}
                            x={coords.rx}
                            y={coords.ry}
                            textAnchor="middle"
                            className="font-mono text-[14px] font-bold fill-[#7C2D12]"
                        >
                            {rashi}
                        </text>
                    );
                })}

                {/* Render Color-coded Planet Abbreviations (su, mo, me, ve, ma, ju, sa, ra, ke) */}
                {Object.keys(houseCoords).map((h) => {
                    const houseNum = parseInt(h, 10);
                    const coords = houseCoords[houseNum];
                    return (
                        <g key={`planets-group-${houseNum}`}>
                            {renderPlanets(houseNum, coords.px, coords.py)}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
