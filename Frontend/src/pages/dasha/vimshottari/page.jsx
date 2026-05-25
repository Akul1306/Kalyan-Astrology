"use client";
export default function VimshottariDashaPage() {
    const dashaSequence = [
        { planet: "Ketu", duration: 7, startDate: "2020-01-01", endDate: "2027-01-01" },
        { planet: "Venus", duration: 20, startDate: "2027-01-01", endDate: "2047-01-01" },
        { planet: "Sun", duration: 6, startDate: "2047-01-01", endDate: "2053-01-01" },
        { planet: "Moon", duration: 10, startDate: "2053-01-01", endDate: "2063-01-01" },
        { planet: "Mars", duration: 7, startDate: "2063-01-01", endDate: "2070-01-01" },
        { planet: "Rahu", duration: 18, startDate: "2070-01-01", endDate: "2088-01-01" },
        { planet: "Jupiter", duration: 16, startDate: "2088-01-01", endDate: "2104-01-01" },
        { planet: "Saturn", duration: 19, startDate: "2104-01-01", endDate: "2123-01-01" },
        { planet: "Mercury", duration: 17, startDate: "2123-01-01", endDate: "2140-01-01" },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vimshottari Dasha</h1>
          <p className="text-gray-600 mb-6">
            The most popular Dasha system in Vedic astrology, spanning 120 years with 9 planetary periods.
          </p>
          
          <div className="space-y-3">
            {dashaSequence.map((dasha, idx) => (<div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{dasha.planet} Dasha</h3>
                    <p className="text-sm text-gray-600">
                      {dasha.startDate} to {dasha.endDate} ({dasha.duration} years)
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {dasha.duration} years
                  </span>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
