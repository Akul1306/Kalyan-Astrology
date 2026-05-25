"use client";
export default function CharaDashaPage() {
    return (<div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Chara Dasha</h1>
          <p className="text-gray-600 mb-6">
            A moveable Dasha system where planets move through houses based on their positions. The duration varies based on the planet's sign.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Note:</strong> Chara Dasha calculations and visualization will be implemented soon.
            </p>
          </div>
        </div>
      </div>
    </div>);
}
