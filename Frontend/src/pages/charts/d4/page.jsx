// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D4 Chaturthamsa Chart - Fortune & Property | Kalyan Dashboard",
    description: "Explore your D4 Chaturthamsa Chart for analyzing fortune, immovable property, assets, happiness, mother, and overall prosperity in life.",
    keywords: "chaturthamsa chart, d4 chart, fortune, property, real estate, mother, vedic astrology",
};
export default function D4ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D4 • Chaturthamsa Chart" subtitle="Fortune, Property, and Happiness. A divisional chart analyzing fortune, immovable property, assets, happiness, mother, and overall prosperity."/>

        <ChartSwitcher chart={{
            chartType: "D4 - Chaturthamsa",
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
            <li>Fortune and overall prosperity</li>
            <li>Immovable property and real estate</li>
            <li>Relationship with mother and maternal family</li>
            <li>Happiness and contentment in life</li>
            <li>Fixed assets and property inheritance</li>
            <li>Material comforts and luxury</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Chaturthamsa chart divides each sign into four equal parts of 7.5 degrees each. This chart is particularly important for understanding fortune, property matters, and relationship with mother.
          </p>
          <p>
            The 4th house in this chart reveals property, happiness, and maternal relationships. Strong benefics here indicate good fortune, property ownership, and harmonious relationship with mother. Venus and Jupiter are particularly significant for fortune and prosperity.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Property Matters:</strong> Ability to acquire and maintain immovable property</li>
            <li><strong>Maternal Relationship:</strong> Connection with mother and maternal family</li>
            <li><strong>Fortune Level:</strong> Overall prosperity and good fortune</li>
            <li><strong>Happiness:</strong> Contentment and satisfaction in domestic life</li>
            <li><strong>Inherited Assets:</strong> Property and assets received through inheritance</li>
            <li><strong>Material Comforts:</strong> Luxury and comfort in life</li>
            <li><strong>Home Environment:</strong> Emotional satisfaction and domestic harmony</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D4 Chaturthamsa chart is essential for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Property investments and real estate decisions</li>
            <li>Understanding relationship with mother</li>
            <li>Assessing overall fortune and prosperity</li>
            <li>Predicting property inheritance matters</li>
            <li>Understanding happiness and contentment levels</li>
            <li>Timing property-related transactions</li>
            <li>Analyzing material comforts and luxury</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Chaturthamsa (one-fourth division) is crucial for analyzing property (Sukha Bhava - 4th house). The 4th house represents mother, property, happiness, and home.
          </p>
          <p>
            The Moon is the natural significator of mother, while Venus represents happiness and material comforts. Jupiter brings fortune and prosperity. When these planets are strong in the 4th house, the native enjoys property ownership, good relationship with mother, and domestic happiness.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong 4th House with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates property ownership, inherited assets, and harmonious relationship with mother. Good fortune and material comforts throughout life. Strong emotional bond with home and family.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Moon in 4th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests strong emotional bond with mother, emotional happiness, and property gains through maternal side of family. Deep connection with home and domestic life.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Venus-Jupiter Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Excellent for property matters, fortune, and material prosperity. Indicates luxury and comfort in life. Strong support from maternal family and inheritance of valuable assets.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
