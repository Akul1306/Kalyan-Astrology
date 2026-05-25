// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D60 Shashtiamsa Chart - Ultimate Refinement | Kalyan Dashboard",
    description: "Explore your D60 Shashtiamsa Chart, the most detailed divisional chart providing the finest level of analysis for precise predictions and comprehensive understanding.",
    keywords: "shashtiamsa chart, d60 chart, detailed analysis, vedic astrology, precision",
};
export default function D60ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D60 • Shashtiamsa Chart" subtitle="Ultimate Refinement and Precision. The most detailed divisional chart, providing the finest level of analysis for precise predictions and comprehensive understanding of all life aspects."/>

        <ChartSwitcher chart={{
            chartType: "D60 - Shashtiamsa",
            planets: [
                { name: "Rahu", house: 1, abbreviation: "Ra" },
                { name: "Sun", house: 2, abbreviation: "Su" },
                { name: "Mercury", house: 3, abbreviation: "Me" },
                { name: "Venus", house: 3, abbreviation: "Ve" },
                { name: "Saturn", house: 4, abbreviation: "Sa" },
                { name: "Mars", house: 5, abbreviation: "Ma" },
                { name: "Ketu", house: 7, abbreviation: "Ke" },
                { name: "Jupiter", house: 9, abbreviation: "Ju" },
                { name: "Moon", house: 11, abbreviation: "Mo" },
            ]
        }}/>

        <ChartSection title="What This Chart Represents">
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Ultimate refinement and precision in analysis</li>
            <li>Most detailed planetary positions</li>
            <li>Comprehensive understanding of all life aspects</li>
            <li>Fine-tuned predictions and timing</li>
            <li>Subtle influences and nuances</li>
            <li>Complete astrological picture</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Shashtiamsa chart divides each sign into sixty equal parts of 0.5 degrees each. This is the most detailed divisional chart, providing the finest level of astrological analysis.
          </p>
          <p>
            This chart reveals subtle influences that may not be visible in other divisional charts. It's used by advanced astrologers for precise predictions and comprehensive understanding. Every planetary position is analyzed with utmost precision, revealing the complete astrological picture.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Precise Influences:</strong> Most accurate planetary influences and effects</li>
            <li><strong>Complete Picture:</strong> Comprehensive understanding of all life aspects</li>
            <li><strong>Subtle Nuances:</strong> Hidden patterns and influences</li>
            <li><strong>Exact Timing:</strong> Precise timing of events and influences</li>
            <li><strong>Advanced Combinations:</strong> Complex yogas and patterns</li>
            <li><strong>Comprehensive Analysis:</strong> Complete life analysis with finest detail</li>
            <li><strong>Ultimate Understanding:</strong> Highest level of astrological insight</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D60 Shashtiamsa chart is essential for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Most precise and detailed astrological analysis</li>
            <li>Understanding subtle influences and nuances</li>
            <li>Exact timing predictions for important events</li>
            <li>Comprehensive understanding of all life aspects</li>
            <li>Advanced astrological research and study</li>
            <li>Resolving complex astrological questions</li>
            <li>Achieving the highest level of astrological insight</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Shashtiamsa (one-sixtieth division) is the most detailed divisional chart used by master astrologers. It provides precision up to 0.5 degrees for each planetary position.
          </p>
          <p>
            This chart is used for resolving complex astrological questions and making the most accurate predictions. Classical texts emphasize that only experienced astrologers should interpret this chart, as it requires deep knowledge and understanding of Vedic astrology principles.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Precise Planetary Positions</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Every planet's position is analyzed with 0.5-degree precision, revealing subtle influences and exact timing of events. Most accurate predictions possible through this level of detail.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Complete Life Picture</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Comprehensive analysis of all life aspects with finest detail. Reveals complete astrological blueprint including all subtle influences that may not be visible in other charts.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Advanced Yogas and Combinations</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Reveals complex yogas and combinations that may not be visible in other charts. Provides ultimate level of astrological understanding for precise predictions and comprehensive analysis.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
