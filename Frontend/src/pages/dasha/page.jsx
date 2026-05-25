"use client";
export default function AllDashaOverviewPage() {
    const dashas = [
        { name: "Vimshottari Dasha", period: "120 years", status: "Active" },
        { name: "Chara Dasha", period: "Variable", status: "Available" },
        { name: "Yogini Dasha", period: "36 years", status: "Available" },
        { name: "Varshphal (Annual)", period: "1 year", status: "Available" },
    ];
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Dasha Overview</h1>
          <p className="text-gray-600 mb-6">
            Overview of all Dasha systems and their current status.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashas.map((dasha, idx) => (<div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{dasha.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${dasha.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"}`}>
                    {dasha.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Period: {dasha.period}</p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
