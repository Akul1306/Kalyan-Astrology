// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D30 Trimshamsa Chart - Evils & Problems | Kalyan Dashboard",
    description: "Explore your D30 Trimshamsa Chart for revealing hidden problems, evils, challenges, obstacles, and malefic influences that may cause difficulties in life.",
    keywords: "trimshamsa chart, d30 chart, problems, evils, obstacles, vedic astrology",
};
export default function D30ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D30 • Trimshamsa Chart" subtitle="Evils, Problems, and Challenges. A divisional chart revealing hidden problems, evils, challenges, obstacles, and malefic influences that may cause difficulties in life."/>

        <ChartSwitcher chart={{
            chartType: "D30 - Trimshamsa",
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
            <li>Hidden problems and challenges</li>
            <li>Evils and malefic influences</li>
            <li>Obstacles and difficulties</li>
            <li>Negative patterns and afflictions</li>
            <li>Health problems and diseases</li>
            <li>Accidents and misfortunes</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Trimshamsa chart divides each sign into thirty equal parts. This chart is specifically used to identify evils, problems, obstacles, and malefic influences in life.
          </p>
          <p>
            Malefic planets like Saturn, Mars, Rahu, and Ketu in unfavorable positions indicate problems and challenges. Strong malefic influences reveal areas of life prone to difficulties. Understanding this chart helps in taking preventive measures and remedies.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Hidden Challenges:</strong> Problems that may not be immediately visible</li>
            <li><strong>Health Issues:</strong> Potential diseases and health concerns</li>
            <li><strong>Obstacles:</strong> Difficulties and challenges in various life areas</li>
            <li><strong>Negative Patterns:</strong> Recurring problems and afflictions</li>
            <li><strong>Accidents:</strong> Potential misfortunes and sudden problems</li>
            <li><strong>Caution Areas:</strong> Life areas requiring extra care</li>
            <li><strong>Remedial Needs:</strong> Areas where remedies may be beneficial</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D30 Trimshamsa chart is valuable for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Identifying hidden problems and challenges</li>
            <li>Understanding health issues and preventive care</li>
            <li>Recognizing obstacles and difficulties</li>
            <li>Taking preventive measures and remedies</li>
            <li>Assessing malefic influences</li>
            <li>Understanding areas requiring caution</li>
            <li>Planning to overcome challenges</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Trimshamsa (one-thirtieth division) is for identifying evils and problems. The 6th house represents diseases and enemies, the 8th house represents accidents and longevity, and the 12th house represents losses.
          </p>
          <p>
            Malefic planets in these houses indicate challenges. Saturn represents delays and obstacles, Mars indicates accidents and injuries, while Rahu and Ketu show sudden problems. Understanding these influences helps in taking appropriate remedies and preventive measures.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Malefic Planets in 6th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates health problems, enemies, and obstacles in life. Need for preventive measures and health care. Challenges in competitive situations. Regular health checkups and care recommended.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">8th House Afflictions</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests sudden problems, accidents, or unexpected challenges. Need for caution and preventive measures. Understanding of longevity matters. Care during unfavorable planetary periods recommended.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Saturn-Mars Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                May indicate delays, obstacles, and challenges requiring patience and perseverance. Difficult situations that test strength and resolve. Remedies and spiritual practices can help mitigate challenges.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
