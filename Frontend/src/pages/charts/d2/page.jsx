// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D2 Hora Chart - Wealth & Finances | Kalyan Dashboard",
    description: "Explore your D2 Hora Chart for wealth analysis, financial prosperity, material possessions, and monetary patterns. Discover your wealth potential through Vedic astrology.",
    keywords: "hora chart, d2 chart, wealth chart, finances, prosperity, vedic astrology",
};
export default function D2ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D2 • Hora Chart" subtitle="Wealth, Finances, and Material Prosperity. A divisional chart specifically analyzing wealth accumulation patterns, financial prosperity, and material possessions in life."/>

        <ChartSwitcher chart={{
            chartType: "D2 - Hora",
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
            <li>Wealth accumulation patterns and financial prosperity</li>
            <li>Material possessions and asset accumulation</li>
            <li>Income sources and earning potential</li>
            <li>Financial stability and monetary security</li>
            <li>Spending patterns and financial management</li>
            <li>Investment success and business profits</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Hora chart divides each sign into two equal parts of 15 degrees each, representing the Sun's hora (daytime) and Moon's hora (nighttime). This chart reveals how wealth flows through different periods and which planetary influences govern financial matters.
          </p>
          <p>
            Strong benefics like Jupiter and Venus in favorable positions indicate wealth, while malefic influences may show financial challenges. The 2nd house (accumulated wealth) and 11th house (gains and income) are particularly important for wealth analysis in this chart.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Wealth Potential:</strong> Natural ability to attract and retain wealth</li>
            <li><strong>Income Sources:</strong> Preferred methods of earning and multiple income streams</li>
            <li><strong>Financial Habits:</strong> Relationship with money and material possessions</li>
            <li><strong>Investment Patterns:</strong> Financial decision-making and investment inclinations</li>
            <li><strong>Financial Cycles:</strong> Periods of financial growth or challenges</li>
            <li><strong>Business Acumen:</strong> Ability to generate profits and manage finances</li>
            <li><strong>Generosity:</strong> Ability to share wealth and charitable inclinations</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D2 Hora chart is crucial for understanding financial matters:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Analyzing wealth potential and financial prospects</li>
            <li>Timing major financial investments or business ventures</li>
            <li>Understanding spending patterns and financial management</li>
            <li>Predicting periods of financial growth or challenges</li>
            <li>Career choices related to financial gain</li>
            <li>Planning for long-term financial security</li>
            <li>Understanding inherited wealth and family assets</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            Classical texts like <em>Brihat Parashara Hora Shastra</em> emphasize that Hora (hour) division is essential for understanding wealth and material prosperity. The Sun governs wealth during daytime births, while the Moon governs wealth for nighttime births.
          </p>
          <p>
            The 2nd house is the primary house of wealth (Dhana Bhava), and the 11th house represents gains (Labha Bhava). When these houses are strong with benefic planets, especially Jupiter and Venus, the native enjoys prosperity and financial stability throughout life.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Jupiter in 2nd House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates steady wealth accumulation, inherited wealth, and financial wisdom. Natural ability to preserve and grow assets. Financial gains through knowledge, teaching, or advisory roles. Strong family wealth and prosperity.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Venus in 11th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests gains through business, partnerships, or creative endeavors. Financial fulfillment through relationships and luxury items. Wealth from arts, beauty industry, or luxury goods business.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Dhana Yoga Formation</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Special planetary combinations indicating significant wealth potential, especially during favorable Dasha periods. Multiple income sources and financial stability throughout life.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
