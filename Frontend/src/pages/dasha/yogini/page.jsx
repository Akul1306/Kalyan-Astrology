"use client";
// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export default function YoginiDashaPage() {
    const yoginiDasha = [
        { name: "Mangala", duration: 1, years: 1 },
        { name: "Pingala", duration: 2, years: 2 },
        { name: "Dhanya", duration: 3, years: 3 },
        { name: "Bhramari", duration: 4, years: 4 },
        { name: "Bhadrika", duration: 5, years: 5 },
        { name: "Ulka", duration: 6, years: 6 },
        { name: "Siddha", duration: 7, years: 7 },
        { name: "Sankata", duration: 8, years: 8 },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Yogini Dasha</h1>
          <p className="text-gray-600 mb-6">
            A 36-year Dasha system with 8 periods, used for quick predictions and timing of events.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {yoginiDasha.map((yogini, idx) => (<div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{yogini.name}</h3>
                <p className="text-2xl font-bold text-orange-600">{yogini.years}</p>
                <p className="text-sm text-gray-600">years</p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
