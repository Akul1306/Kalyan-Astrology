"use client";
export default function VarshphalPage() {
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Varshphal (Annual Chart)</h1>
          <p className="text-gray-600 mb-6">
            The Annual Chart (Solar Return Chart) is cast for each birthday to predict events for the coming year.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Current Year</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Year:</strong> 2024</li>
                <li><strong>Birthday:</strong> January 15, 2024</li>
                <li><strong>Next Birthday:</strong> January 15, 2025</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Key Predictions</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Career opportunities expected</li>
                <li>• Financial gains likely</li>
                <li>• Health requires attention</li>
                <li>• Relationship harmony expected</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Note:</strong> Detailed Varshphal analysis and chart will be implemented soon.
            </p>
          </div>
        </div>
      </div>
    </div>);
}
