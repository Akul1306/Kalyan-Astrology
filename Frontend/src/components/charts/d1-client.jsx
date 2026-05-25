"use client";
export default function D1Client() {
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">D1 - Lagna Chart</h1>
          <p className="text-gray-600 mb-6">
            The Lagna Chart (Ascendant Chart) is the primary chart in Vedic astrology, showing the planetary positions at the time of birth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Chart Details</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Chart Type:</strong> Birth Chart</li>
                <li><strong>Division:</strong> D1</li>
                <li><strong>Total Houses:</strong> 12</li>
                <li><strong>Purpose:</strong> Primary analysis chart</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Quick Stats</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Planets:</strong> 9</li>
                <li><strong>Houses:</strong> 12</li>
                <li><strong>Signs:</strong> 12</li>
                <li><strong>Nakshatras:</strong> 27</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Note:</strong> This is a demo page. Chart visualization and detailed analysis will be implemented soon.
            </p>
          </div>
        </div>
      </div>
    </div>);
}
