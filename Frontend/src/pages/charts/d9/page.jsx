// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D9 Navamsa Chart - Marriage, Dharma, Life Path | Kalyan Dashboard",
    description: "Explore your D9 Navamsa Chart, the most important divisional chart after D1. Reveals spouse nature, marriage quality, dharma, spiritual growth, and karmic refinement.",
    keywords: "navamsa chart, d9 chart, marriage chart, spouse, dharma, vedic astrology, kundli",
};
export default function D9ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D9 • Navamsa Chart" subtitle="Marriage, Dharma, and Spiritual Maturity. The most important divisional chart after D1, revealing spouse nature, marriage quality, dharma, spiritual growth, and karmic refinement."/>

        <ChartSwitcher chart={{
            chartType: "D9 - Navamsa",
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
            <li>Marriage and spouse characteristics</li>
            <li>Dharma and spiritual path</li>
            <li>Karmic refinement and inner nature</li>
            <li>Quality of married life</li>
            <li>Spiritual evolution and purity</li>
            <li>Deeper personality traits</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Navamsa chart divides each sign into nine equal parts of 3.33 degrees each. This is considered the most important divisional chart and is often called the "spouse chart" or "dharma chart."
          </p>
          <p>
            The 7th house reveals spouse characteristics, while the Lagna shows refined personality. Planets in Navamsa show their deeper expression. Strong benefics indicate harmonious marriage and spiritual growth. The Navamsa Lagna often becomes more significant after marriage, showing the refined personality that emerges through partnership.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Spouse Nature:</strong> Characteristics, qualities, and nature of life partner</li>
            <li><strong>Marriage Quality:</strong> Harmony, compatibility, and fulfillment in marriage</li>
            <li><strong>Dharma:</strong> Spiritual path, righteousness, and life purpose</li>
            <li><strong>Karmic Refinement:</strong> Inner purity and spiritual evolution</li>
            <li><strong>Refined Personality:</strong> Deeper traits revealed after marriage</li>
            <li><strong>Spiritual Growth:</strong> Evolution through partnership and dharma</li>
            <li><strong>Life After Marriage:</strong> How life transforms through partnership</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D9 Navamsa chart is crucial for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Marriage compatibility and matchmaking (Kundli Milan)</li>
            <li>Understanding spouse characteristics</li>
            <li>Predicting marriage timing</li>
            <li>Assessing dharma and spiritual path</li>
            <li>Understanding karmic refinement</li>
            <li>Analyzing life after marriage</li>
            <li>Spiritual growth and evolution</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to <em>Brihat Parashara Hora Shastra</em>, Navamsa is the most important divisional chart after the Lagna chart. It's called "Navamsa" meaning one-ninth division and is essential for analyzing marriage and dharma.
          </p>
          <p>
            Venus is the natural significator of marriage and spouse. When Venus is strong in Navamsa, marriage is harmonious. The Navamsa Lagna becomes significant after marriage, and planets in exaltation in Navamsa show their highest expression. Classical texts emphasize that a strong Navamsa indicates spiritual growth and dharmic maturity.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Venus in 7th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates harmonious marriage, beautiful and loving spouse, and fulfillment in partnerships. Marriage brings happiness, prosperity, and emotional satisfaction. Strong romantic connection and mutual understanding.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Jupiter in Navamsa Lagna</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests strong dharma, spiritual growth after marriage, and refined character. Marriage becomes a path to spiritual evolution. Wisdom, righteousness, and dharmic fulfillment through partnership.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Exalted Planets in Navamsa</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Planets in exaltation show their highest expression. Indicates peak potential and spiritual refinement in those areas of life. Excellent for marriage, dharma, and spiritual evolution.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
