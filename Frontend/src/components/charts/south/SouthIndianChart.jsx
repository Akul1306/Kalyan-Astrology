"use client";
// Planet colors
const planetColors = {
    Sun: "#F59E0B",
    Moon: "#60A5FA",
    Mars: "#EF4444",
    Mercury: "#10B981",
    Jupiter: "#8B5CF6",
    Venus: "#EC4899",
    Saturn: "#64748B",
    Rahu: "#7C3AED",
    Ketu: "#6366F1",
};
// Default planets for demo
const defaultPlanets = [
    { name: "Rahu", house: 1, abbreviation: "Ra" },
    { name: "Sun", house: 2, abbreviation: "Su" },
    { name: "Mercury", house: 3, abbreviation: "Me" },
    { name: "Venus", house: 3, abbreviation: "Ve" },
    { name: "Saturn", house: 4, abbreviation: "Sa" },
    { name: "Mars", house: 5, abbreviation: "Ma" },
    { name: "Ketu", house: 7, abbreviation: "Ke" },
    { name: "Jupiter", house: 9, abbreviation: "Ju" },
    { name: "Moon", house: 11, abbreviation: "Mo" },
];
export function SouthIndianChart({ planets = defaultPlanets, chartType = "D1" }) {
    // Group planets by house
    const planetsByHouse = planets.reduce((acc, planet) => {
        if (!acc[planet.house])
            acc[planet.house] = [];
        acc[planet.house].push(planet);
        return acc;
    }, {});
    // South Indian: 12 houses in 3x4 grid (fixed positions)
    // Layout matches reference: Top row (12, 1, 2), Middle row (11, center empty with 5&8, 3), Bottom row (10, 7, 4), Left side (9), Right side (5, 6, 8)
    const boxSize = 100;
    const spacing = 12;
    const startX = 70;
    const startY = 70;
    return (<div className="flex items-center justify-center w-full">
      <svg viewBox="0 0 500 500" className="w-full max-w-[520px] h-auto">
        {/* Outer border */}
        <rect x="20" y="20" width="460" height="460" fill="none" stroke="#D4AF37" strokeWidth="3" rx="12"/>

        {/* Inner border */}
        <rect x="40" y="40" width="420" height="420" fill="none" stroke="#FCD34D" strokeWidth="1.5" opacity="0.3" rx="10"/>

        {/* South Indian Style - 12 Houses in Grid Layout */}
        
        {/* House 12 - Top Left */}
        <rect x={startX} y={startY} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + boxSize / 2} y={startY + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          12
        </text>
        {planetsByHouse[12]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + boxSize / 2} y={startY + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 1 - Top Center */}
        <rect x={startX + boxSize + spacing} y={startY} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + boxSize + spacing + boxSize / 2} y={startY + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          1
        </text>
        {planetsByHouse[1]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + boxSize + spacing + boxSize / 2} y={startY + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 2 - Top Right */}
        <rect x={startX + (boxSize + spacing) * 2} y={startY} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + (boxSize + spacing) * 2 + boxSize / 2} y={startY + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          2
        </text>
        {planetsByHouse[2]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + (boxSize + spacing) * 2 + boxSize / 2} y={startY + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 11 - Middle Left */}
        <rect x={startX} y={startY + boxSize + spacing} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + boxSize / 2} y={startY + boxSize + spacing + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          11
        </text>
        {planetsByHouse[11]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + boxSize / 2} y={startY + boxSize + spacing + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* Center - Empty (house 5 and 8 at vertices) */}
        <rect x={startX + boxSize + spacing} y={startY + boxSize + spacing} width={boxSize} height={boxSize} fill="none" stroke="#FCD34D" strokeWidth="1" strokeDasharray="3,3" opacity="0.2"/>
        <text x={startX + boxSize + spacing + boxSize / 2} y={startY + boxSize + spacing + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">
          5
        </text>
        <text x={startX + boxSize + spacing + boxSize / 2} y={startY + boxSize + spacing + boxSize / 2 + 15} textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">
          8
        </text>

        {/* House 3 - Middle Right */}
        <rect x={startX + (boxSize + spacing) * 2} y={startY + boxSize + spacing} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + (boxSize + spacing) * 2 + boxSize / 2} y={startY + boxSize + spacing + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          3
        </text>
        {planetsByHouse[3]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + (boxSize + spacing) * 2 + boxSize / 2} y={startY + boxSize + spacing + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 10 - Bottom Left */}
        <rect x={startX} y={startY + (boxSize + spacing) * 2} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + boxSize / 2} y={startY + (boxSize + spacing) * 2 + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          10
        </text>
        {planetsByHouse[10]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + boxSize / 2} y={startY + (boxSize + spacing) * 2 + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 7 - Bottom Center */}
        <rect x={startX + boxSize + spacing} y={startY + (boxSize + spacing) * 2} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + boxSize + spacing + boxSize / 2} y={startY + (boxSize + spacing) * 2 + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          7
        </text>
        {planetsByHouse[7]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + boxSize + spacing + boxSize / 2} y={startY + (boxSize + spacing) * 2 + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 4 - Bottom Right */}
        <rect x={startX + (boxSize + spacing) * 2} y={startY + (boxSize + spacing) * 2} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + (boxSize + spacing) * 2 + boxSize / 2} y={startY + (boxSize + spacing) * 2 + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          4
        </text>
        {planetsByHouse[4]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + (boxSize + spacing) * 2 + boxSize / 2} y={startY + (boxSize + spacing) * 2 + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 9 - Left Column (between 12 and 10) */}
        <rect x={startX - boxSize - spacing} y={startY + boxSize / 2} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX - boxSize - spacing + boxSize / 2} y={startY + boxSize / 2 + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          9
        </text>
        {planetsByHouse[9]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX - boxSize - spacing + boxSize / 2} y={startY + boxSize / 2 + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 5 - Right Column Top */}
        <rect x={startX + (boxSize + spacing) * 3} y={startY} width={boxSize} height={boxSize / 2} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + (boxSize + spacing) * 3 + boxSize / 2} y={startY + boxSize / 4 - 5} textAnchor="middle" fill="#92400E" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          5
        </text>
        {planetsByHouse[5]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + (boxSize + spacing) * 3 + boxSize / 2} y={startY + boxSize / 4 + 10 + idx * 12} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 6 - Right Column Middle */}
        <rect x={startX + (boxSize + spacing) * 3} y={startY + boxSize / 2 + spacing / 2} width={boxSize} height={boxSize} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + (boxSize + spacing) * 3 + boxSize / 2} y={startY + boxSize / 2 + spacing / 2 + boxSize / 2 - 10} textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          6
        </text>
        {planetsByHouse[6]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + (boxSize + spacing) * 3 + boxSize / 2} y={startY + boxSize / 2 + spacing / 2 + boxSize / 2 + 15 + idx * 15} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* House 8 - Right Column Bottom */}
        <rect x={startX + (boxSize + spacing) * 3} y={startY + boxSize / 2 + spacing / 2 + boxSize + spacing / 2} width={boxSize} height={boxSize / 2} fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" className="transition-opacity hover:opacity-90"/>
        <text x={startX + (boxSize + spacing) * 3 + boxSize / 2} y={startY + boxSize / 2 + spacing / 2 + boxSize + spacing / 2 + boxSize / 4 - 5} textAnchor="middle" fill="#92400E" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          8
        </text>
        {planetsByHouse[8]?.map((planet, idx) => (<text key={`${planet.name}-${idx}`} x={startX + (boxSize + spacing) * 3 + boxSize / 2} y={startY + boxSize / 2 + spacing / 2 + boxSize + spacing / 2 + boxSize / 4 + 10 + idx * 12} textAnchor="middle" fill={planetColors[planet.name] || "#64748B"} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            {planet.abbreviation}
          </text>))}

        {/* Chart type label */}
        <text x="250" y="460" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" opacity="0.7">
          {chartType}
        </text>
      </svg>
    </div>);
}
