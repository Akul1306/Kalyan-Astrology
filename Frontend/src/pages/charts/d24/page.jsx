// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D24 Chaturvimshamsa Chart - Education & Learning | Kalyan Dashboard",
    description: "Explore your D24 Chaturvimshamsa Chart for analyzing education, learning abilities, knowledge acquisition, academic success, and intellectual pursuits.",
    keywords: "chaturvimshamsa chart, d24 chart, education, learning, knowledge, vedic astrology",
};
export default function D24ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D24 • Chaturvimshamsa Chart" subtitle="Education, Learning, and Knowledge. A divisional chart analyzing education, learning abilities, knowledge acquisition, academic success, and intellectual pursuits."/>

        <ChartSwitcher chart={{
            chartType: "D24 - Chaturvimshamsa",
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
            <li>Education and academic pursuits</li>
            <li>Learning abilities and intelligence</li>
            <li>Knowledge acquisition and retention</li>
            <li>Academic success and achievements</li>
            <li>Intellectual pursuits and studies</li>
            <li>Higher education and specialization</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Chaturvimshamsa chart divides each sign into twenty-four equal parts. This chart is specifically designed to analyze education, learning abilities, and academic success.
          </p>
          <p>
            The 5th house represents education and learning, while Mercury and Jupiter are key planets. Strong benefics indicate excellent learning abilities, academic success, and intellectual pursuits. The chart reveals the type of education and learning style most suitable for the native.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Learning Abilities:</strong> Natural intelligence and learning capacity</li>
            <li><strong>Academic Success:</strong> Achievements and performance in studies</li>
            <li><strong>Education Type:</strong> Most suitable fields of study</li>
            <li><strong>Knowledge Retention:</strong> Ability to acquire and retain information</li>
            <li><strong>Intellectual Pursuits:</strong> Interests and inclinations in learning</li>
            <li><strong>Higher Education:</strong> Potential for advanced studies and specialization</li>
            <li><strong>Teaching Abilities:</strong> Capacity to share knowledge and teach</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D24 Chaturvimshamsa chart is essential for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Educational guidance and career choices</li>
            <li>Understanding learning abilities and styles</li>
            <li>Predicting academic success and achievements</li>
            <li>Choosing appropriate fields of study</li>
            <li>Timing educational pursuits and higher studies</li>
            <li>Assessing intellectual capabilities</li>
            <li>Understanding knowledge acquisition patterns</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Chaturvimshamsa (one-twenty-fourth division) is for analyzing education and learning (Vidya). The 5th house represents education, learning, and intelligence (Putra Bhava).
          </p>
          <p>
            Mercury represents learning abilities and education, while Jupiter represents higher education, wisdom, and teaching. When these planets are strong in the 5th house, the native excels in studies and academic pursuits. Vidya Yoga (education-giving combinations) indicate academic excellence.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Mercury in 5th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates excellent learning abilities, quick grasp of knowledge, and academic success. Natural aptitude for studies and education. Success in communication-based fields and intellectual pursuits.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Jupiter-Mercury Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests higher education success, teaching abilities, and deep knowledge in specialized fields. Academic excellence and wisdom. Success in research, teaching, or knowledge-based professions.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Vidya Yoga Formation</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Special combinations indicating excellent education, academic achievements, and success in intellectual pursuits throughout life. Natural talent for learning and knowledge sharing.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
