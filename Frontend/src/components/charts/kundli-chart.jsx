"use client";
export function KundliChart({ chartData, title, size = "medium" }) {
    const sizeClasses = {
        small: "w-32 h-32",
        medium: "w-48 h-48",
        large: "w-64 h-64",
    };
    const cellSizeClasses = {
        small: "text-xs",
        medium: "text-sm",
        large: "text-base",
    };
    return (<div className="flex flex-col items-center space-y-2">
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className={`${sizeClasses[size]} border-2 border-gray-800 relative bg-white`}>
        {/* Outer diamond structure */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {chartData.flat().map((value, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            // Skip center cell for traditional Kundli layout
            if (row === 1 && col === 1)
                return null;
            return (<div key={index} className={`border border-gray-400 flex items-center justify-center ${cellSizeClasses[size]} font-medium`}>
                {value || ""}
              </div>);
        })}
        </div>

        {/* Diagonal lines for traditional Kundli appearance */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#374151" strokeWidth="1"/>
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#374151" strokeWidth="1"/>
        </svg>
      </div>
    </div>);
}
