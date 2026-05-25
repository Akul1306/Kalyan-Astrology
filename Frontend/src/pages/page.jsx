import { KundliForm } from "@/components/forms/kundli-form";
import MovingGradient from "@/components/store/Perfume/MovingGradient";
export default function HomePage() {
    return (<div className="flex-1 flex flex-col items-center justify-center p-4 relative">
      <MovingGradient />
      <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kundli Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate accurate and detailed Vedic astrology charts with professional-grade calculations and insights.
          </p>
        </div>

        <KundliForm title="Generate Your Kundli" isFirstTime={true}/>
      </div>
    </div>);
}
