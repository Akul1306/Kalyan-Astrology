import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D16 Kalamsa Chart - Spiritual Path | Kalyan Dashboard",
    description: "Explore your D16 Kalamsa Chart for analyzing spirituality, meditation, inner peace, spiritual practices, and connection with higher consciousness.",
    keywords: "kalamsa chart, d16 chart, spirituality, meditation, vedic astrology",
};
export default function D16ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D16 • Kalamsa Chart" subtitle="Spiritual Path and Inner Peace. A divisional chart focusing on spirituality, meditation, inner peace, spiritual practices, and connection with higher consciousness."/>

        <ChartSwitcher chart={{
            chartType: "D16 - Kalamsa",
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
            <li>Spiritual inclination and practices</li>
            <li>Meditation and inner peace</li>
            <li>Connection with higher consciousness</li>
            <li>Spiritual evolution and growth</li>
            <li>Religious and philosophical pursuits</li>
            <li>Inner transformation and awakening</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Kalamsa chart divides each sign into sixteen equal parts. This chart reveals spiritual inclinations, meditation abilities, and connection with the divine.
          </p>
          <p>
            Strong benefics, especially Jupiter and Moon, indicate spiritual growth and meditation abilities. The 9th house (Dharma) and 12th house (Moksha - liberation) are significant for spirituality. Planets in favorable positions show natural inclination toward spiritual practices and inner peace.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Spiritual Inclination:</strong> Natural tendency toward spiritual practices</li>
            <li><strong>Meditation Abilities:</strong> Capacity for meditation and contemplation</li>
            <li><strong>Guru Connection:</strong> Relationship with spiritual teachers and guides</li>
            <li><strong>Inner Peace:</strong> Tranquility and emotional stability</li>
            <li><strong>Religious Pursuits:</strong> Interest in religious and philosophical studies</li>
            <li><strong>Spiritual Evolution:</strong> Growth and transformation through practices</li>
            <li><strong>Path to Liberation:</strong> Journey toward moksha and enlightenment</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D16 Kalamsa chart is essential for understanding:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Spiritual practices and meditation</li>
            <li>Connection with higher consciousness</li>
            <li>Understanding dharma and spiritual path</li>
            <li>Religious and philosophical inclinations</li>
            <li>Inner transformation and awakening</li>
            <li>Relationship with gurus and spiritual teachers</li>
            <li>Path toward liberation and spiritual evolution</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Kalamsa (one-sixteenth division) is for analyzing spirituality and meditation. The 9th house represents dharma and spiritual practices, while the 12th house represents moksha (liberation).
          </p>
          <p>
            Jupiter indicates spiritual wisdom and guru guidance. Moon represents inner peace and meditation. Ketu shows spiritual detachment and liberation. Strong benefic influences in these houses indicate natural spiritual inclination and progress toward enlightenment.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-linear-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Jupiter in 9th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates natural spiritual inclination, connection with gurus, and deep interest in dharma. Strong philosophical and spiritual pursuits. Guidance from spiritual teachers throughout life.
              </p>
            </div>
            <div className="bg-linear-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Moon-Ketu Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests strong meditation abilities, inner peace, and detachment from material world. Natural inclination toward spiritual practices and contemplation. Progress toward spiritual liberation.
              </p>
            </div>
            <div className="bg-linear-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">12th House with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates strong spiritual practices, meditation, and connection with higher consciousness. Path toward moksha and liberation. Natural ability for spiritual disciplines and inner transformation.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
