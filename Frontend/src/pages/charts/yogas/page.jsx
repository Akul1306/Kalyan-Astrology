// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
export const metadata = {
    title: "Yogas & Doshas - Planetary Combinations | Kalyan Dashboard",
    description: "Explore planetary yogas (beneficial combinations) and doshas (afflictions) in your birth chart. Understand how planetary combinations affect your life patterns in Vedic astrology.",
    keywords: "yogas, doshas, planetary combinations, raj yoga, shani dosha, vedic astrology",
};
export default function YogasDoshasPage() {
    const yogas = [
        { name: "Raj Yoga", type: "Beneficial", description: "Formed by connection of lords of Kendra and Trikona houses" },
        { name: "Chandra-Mangala Yoga", type: "Beneficial", description: "Moon and Mars in same sign" },
        { name: "Kemadruma Yoga", type: "Malefic", description: "Moon without any planets on either side" },
        { name: "Shani Dosha", type: "Malefic", description: "Saturn aspects causing delays and obstacles" },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Yogas & Doshas</h1>
          <p className="text-gray-600 mb-6">
            Planetary combinations and afflictions in your chart.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yogas.map((yoga, idx) => (<div key={idx} className={`rounded-lg p-4 border-l-4 ${yoga.type === "Beneficial" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{yoga.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${yoga.type === "Beneficial" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {yoga.type}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{yoga.description}</p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
