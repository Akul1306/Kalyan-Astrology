// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
export const metadata = {
    title: "Planetary Positions - Birth Chart Planets | Kalyan Dashboard",
    description: "View detailed planetary positions in your birth chart. See sign, degree, and house placements for all planets including Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.",
    keywords: "planetary positions, planets in signs, birth chart planets, vedic astrology, horoscope planets",
};
export default function PlanetaryPositionsPage() {
    const planets = [
        { name: "Sun", sign: "Aries", degree: "15° 30'", house: 1 },
        { name: "Moon", sign: "Cancer", degree: "22° 15'", house: 4 },
        { name: "Mars", sign: "Scorpio", degree: "8° 45'", house: 7 },
        { name: "Mercury", sign: "Pisces", degree: "18° 20'", house: 12 },
        { name: "Jupiter", sign: "Sagittarius", degree: "10° 10'", house: 9 },
        { name: "Venus", sign: "Taurus", degree: "25° 55'", house: 2 },
        { name: "Saturn", sign: "Capricorn", degree: "12° 40'", house: 10 },
        { name: "Rahu", sign: "Leo", degree: "5° 25'", house: 5 },
        { name: "Ketu", sign: "Aquarius", degree: "5° 25'", house: 11 },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Planetary Positions</h1>
          <p className="text-gray-600 mb-6">
            Detailed positions of all planets in your birth chart.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Planet</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sign</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Degree</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">House</th>
                </tr>
              </thead>
              <tbody>
                {planets.map((planet, idx) => (<tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">{planet.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{planet.sign}</td>
                    <td className="border border-gray-300 px-4 py-3">{planet.degree}</td>
                    <td className="border border-gray-300 px-4 py-3">{planet.house}</td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
}
