import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D12 Dwadashamsa Chart - Parents & Ancestors | Kalyan Dashboard",
    description: "Explore your D12 Dwadashamsa Chart for analyzing parents, ancestors, lineage, past life karma, and inherited traits from family lineage.",
    keywords: "dwadashamsa chart, d12 chart, parents, ancestors, lineage, vedic astrology",
};
export default function D12ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D12 • Dwadashamsa Chart" subtitle="Parents, Ancestors, and Lineage. A divisional chart analyzing parents, ancestors, lineage, past life karma, and inherited traits from family lineage."/>

        <ChartSwitcher chart={{
            chartType: "D12 - Dwadashamsa",
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
            <li>Relationship with parents</li>
            <li>Ancestral lineage and heritage</li>
            <li>Inherited traits and family karma</li>
            <li>Past life influences</li>
            <li>Paternal and maternal influences</li>
            <li>Family legacy and traditions</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Dwadashamsa chart divides each sign into twelve equal parts. This chart reveals information about parents, ancestors, and inherited karmic patterns.
          </p>
          <p>
            The 9th house represents father and paternal lineage, while the 4th house represents mother and maternal lineage. Strong benefics indicate supportive parents and positive ancestral influences. Understanding this chart helps recognize inherited traits and family karma that influence your life.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Parental Relations:</strong> Relationship dynamics with father and mother</li>
            <li><strong>Inherited Traits:</strong> Characteristics inherited from lineage</li>
            <li><strong>Ancestral Karma:</strong> Family karma and blessings</li>
            <li><strong>Family Traditions:</strong> Values and traditions passed down</li>
            <li><strong>Past Life Influences:</strong> Karmic patterns from previous lives</li>
            <li><strong>Paternal Characteristics:</strong> Traits from father's side</li>
            <li><strong>Maternal Characteristics:</strong> Traits from mother's side</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D12 Dwadashamsa chart is valuable for understanding:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Relationship dynamics with parents</li>
            <li>Understanding inherited traits and family patterns</li>
            <li>Ancestral karma and past life influences</li>
            <li>Family legacy and heritage</li>
            <li>Recognizing parental influences on life</li>
            <li>Understanding family traditions and values</li>
            <li>Assessing blessings from ancestors</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Dwadashamsa (one-twelfth division) is for analyzing parents and ancestors. The 9th house represents father (Pitru) and 4th house represents mother (Matru).
          </p>
          <p>
            Sun is the natural significator of father, while Moon represents mother. Jupiter indicates wisdom and blessings from ancestors. Strong benefic influences show supportive parents, positive ancestral karma, and inherited wisdom that guides life.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Sun in 9th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates supportive father, strong paternal lineage, and positive influence from father's side. Inherited wisdom and dharma from ancestors. Strong connection with paternal family traditions.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Moon with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests loving mother, strong maternal lineage, and emotional support from mother's side. Positive ancestral blessings and strong family bonds. Inherited emotional wisdom and nurturing qualities.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Jupiter in Angular Houses</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates wisdom and fortune inherited from both parental lines. Strong ancestral blessings and positive family karma. Guidance and support from family lineage throughout life.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
