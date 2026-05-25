// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
export const metadata = {
    title: "House Report - 12 Houses Analysis | Kalyan Dashboard",
    description: "Complete analysis of all 12 houses in your birth chart. Understand house lords, significations, and their influence on different aspects of life including career, relationships, wealth, and spirituality.",
    keywords: "12 houses, birth chart houses, house analysis, lagna, dhana, karma, bhagya, vedic astrology",
};
export default function HouseReportPage() {
    const houses = [
        { number: 1, name: "Lagna (Ascendant)", lord: "Mars", significance: "Self, personality, physical appearance" },
        { number: 2, name: "Dhana (Wealth)", lord: "Venus", significance: "Wealth, family, speech, food" },
        { number: 3, name: "Sahaja (Siblings)", lord: "Mercury", significance: "Siblings, courage, communication" },
        { number: 4, name: "Sukha (Happiness)", lord: "Moon", significance: "Mother, home, education, property" },
        { number: 5, name: "Putra (Children)", lord: "Sun", significance: "Children, intelligence, creativity" },
        { number: 6, name: "Ripu (Enemies)", lord: "Mercury", significance: "Health, enemies, service, debts" },
        { number: 7, name: "Kalatra (Spouse)", lord: "Venus", significance: "Marriage, partnerships, spouse" },
        { number: 8, name: "Ayush (Longevity)", lord: "Saturn", significance: "Longevity, transformation, occult" },
        { number: 9, name: "Bhagya (Fortune)", lord: "Jupiter", significance: "Dharma, fortune, higher learning" },
        { number: 10, name: "Karma (Career)", lord: "Saturn", significance: "Career, profession, reputation" },
        { number: 11, name: "Labha (Gains)", lord: "Jupiter", significance: "Gains, income, friends, aspirations" },
        { number: 12, name: "Vyaya (Losses)", lord: "Jupiter", significance: "Losses, expenses, spirituality" },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">House Report</h1>
          <p className="text-gray-600 mb-6">
            Detailed analysis of all 12 houses in your birth chart.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {houses.map((house) => (<div key={house.number} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-orange-600">H{house.number}</span>
                  <span className="text-sm font-semibold text-gray-700">{house.lord}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{house.name}</h3>
                <p className="text-sm text-gray-600">{house.significance}</p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
