// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
export const metadata = {
    title: "Aspects & Conjunctions - Planetary Relationships | Kalyan Dashboard",
    description: "Analyze planetary aspects and conjunctions in your birth chart. Understand how planets influence each other through aspects and conjunctions, affecting various life areas.",
    keywords: "planetary aspects, conjunctions, planetary relationships, vedic astrology, birth chart aspects",
};
export default function AspectsConjunctionsPage() {
    const aspects = [
        { from: "Sun", to: "Moon", type: "Conjunction", effect: "Strong personality, leadership qualities" },
        { from: "Mars", to: "Jupiter", type: "Sextile", effect: "Courage combined with wisdom" },
        { from: "Venus", to: "Saturn", type: "Square", effect: "Challenges in relationships and finances" },
        { from: "Mercury", to: "Rahu", type: "Conjunction", effect: "Sharp intellect, unconventional thinking" },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Aspects & Conjunctions</h1>
          <p className="text-gray-600 mb-6">
            Planetary aspects and conjunctions affecting your chart.
          </p>
          
          <div className="space-y-4">
            {aspects.map((aspect, idx) => (<div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {aspect.from} → {aspect.to}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {aspect.type}
                  </span>
                </div>
                <p className="text-gray-700">{aspect.effect}</p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
