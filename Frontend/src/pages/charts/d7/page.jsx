// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D7 Saptamsa Chart - Children & Creativity | Kalyan Dashboard",
    description: "Explore your D7 Saptamsa Chart for analyzing children, progeny, creativity, artistic abilities, and potential for having offspring.",
    keywords: "saptamsa chart, d7 chart, children, progeny, creativity, fertility, vedic astrology",
};
export default function D7ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D7 • Saptamsa Chart" subtitle="Children, Creativity, and Progeny. A divisional chart specifically analyzing children, progeny matters, creativity, artistic abilities, and potential for having offspring."/>

        <ChartSwitcher chart={{
            chartType: "D7 - Saptamsa",
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
            <li>Children and progeny matters</li>
            <li>Creative abilities and artistic talents</li>
            <li>Potential for having children</li>
            <li>Relationship with children</li>
            <li>Fertility and reproductive health</li>
            <li>Artistic expression and creativity</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Saptamsa chart divides each sign into seven equal parts. This chart is crucial for understanding matters related to children, creativity, and artistic expression.
          </p>
          <p>
            The 5th house (Putra Bhava - house of children) is most significant in this chart. Jupiter and Venus play important roles—Jupiter as the natural significator of children and Venus for creativity. Strong benefics indicate good relationship with children and creative talents. Malefic influences may show challenges in progeny matters.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Progeny Potential:</strong> Likelihood of having children and their number</li>
            <li><strong>Child Relationship:</strong> Nature of relationship with children</li>
            <li><strong>Creative Talents:</strong> Artistic abilities and creative expression</li>
            <li><strong>Fertility Matters:</strong> Reproductive health and fertility</li>
            <li><strong>Artistic Expression:</strong> Talents in arts, music, or creative fields</li>
            <li><strong>Nurturing Abilities:</strong> Capacity to nurture and guide children</li>
            <li><strong>Educational Pursuits:</strong> Teaching and learning abilities</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D7 Saptamsa chart is essential for understanding:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Progeny matters and fertility concerns</li>
            <li>Relationship dynamics with children</li>
            <li>Creative pursuits and artistic careers</li>
            <li>Timing for planning children</li>
            <li>Understanding creative talents and expression</li>
            <li>Educational pursuits and learning abilities</li>
            <li>Predicting outcomes of creative projects</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to <em>Brihat Parashara Hora Shastra</em>, the Saptamsa (one-seventh division) is specifically for analyzing children (Putra) and creativity. The 5th house is the Putra Bhava (house of children).
          </p>
          <p>
            Jupiter is the natural significator of children, while Venus represents creativity and arts. The Moon indicates fertility. When these planets are strong in the 5th house, the native is blessed with children and creative abilities. Putra Yoga (children-giving combinations) are analyzed in this chart.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Jupiter in 5th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates blessed with children, good relationship with offspring, and strong creative abilities. Children bring joy and wisdom. Success in teaching, education, or creative fields.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Venus-Moon Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests artistic talents, creative expression, and harmonious relationship with children. Fertility and creative projects flourish. Natural talent for arts, music, or creative pursuits.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Putra Yoga Formation</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Special combinations indicating likelihood of having children, their number, and nature of relationship with progeny. Strong creative and artistic inclinations throughout life.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
