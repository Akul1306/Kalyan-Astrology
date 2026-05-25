// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D20 Vimsamsa Chart - Spiritual Progress | Kalyan Dashboard",
    description: "Explore your D20 Vimsamsa Chart for analyzing spiritual progress, religious practices, devotion, and deeper connection with divine energies.",
    keywords: "vimsamsa chart, d20 chart, spiritual progress, devotion, vedic astrology",
};
export default function D20ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D20 • Vimsamsa Chart" subtitle="Spiritual Progress and Devotion. A divisional chart analyzing spiritual progress, religious practices, devotion, and deeper connection with divine energies."/>

        <ChartSwitcher chart={{
            chartType: "D20 - Vimsamsa",
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
            <li>Spiritual progress and evolution</li>
            <li>Religious practices and devotion</li>
            <li>Connection with divine energies</li>
            <li>Spiritual disciplines and sadhana</li>
            <li>Religious rituals and ceremonies</li>
            <li>Divine blessings and grace</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Vimsamsa chart divides each sign into twenty equal parts. This chart reveals deeper spiritual progress, religious practices, and devotion to divine principles.
          </p>
          <p>
            Strong Jupiter, Moon, and Ketu indicate strong spiritual progress. The 9th house represents dharma and religious practices, while the 12th house shows spiritual disciplines. Benefic influences reveal natural devotion and connection with divine energies.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Spiritual Progress:</strong> Level of advancement on spiritual path</li>
            <li><strong>Devotion:</strong> Sincere dedication to spiritual practices</li>
            <li><strong>Divine Connection:</strong> Relationship with divine energies and grace</li>
            <li><strong>Spiritual Disciplines:</strong> Regular practice of sadhana and meditation</li>
            <li><strong>Religious Activities:</strong> Participation in rituals and ceremonies</li>
            <li><strong>Divine Blessings:</strong> Grace and support from higher forces</li>
            <li><strong>Spiritual Evolution:</strong> Progress toward enlightenment</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D20 Vimsamsa chart is valuable for understanding:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Spiritual progress and evolution</li>
            <li>Religious practices and devotion</li>
            <li>Connection with divine energies and grace</li>
            <li>Spiritual disciplines and meditation practices</li>
            <li>Understanding religious inclinations</li>
            <li>Assessing progress toward liberation</li>
            <li>Divine blessings and spiritual support</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Vimsamsa (one-twentieth division) is for analyzing spiritual progress and devotion. The 9th house represents dharma and religious practices, while the 12th house represents moksha (liberation).
          </p>
          <p>
            Jupiter represents religious wisdom and spiritual guidance. Moon indicates devotion and emotional connection with the divine. Ketu shows spiritual detachment and renunciation. Strong benefic influences indicate natural spiritual progress and connection with divine grace.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Jupiter-Moon Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates strong devotion, regular spiritual practices, and emotional connection with divine. Natural inclination toward religious activities. Progress through sincere devotion and spiritual disciplines.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong 9th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests deep interest in dharma, religious studies, and spiritual practices. Strong connection with religious traditions and teachings. Guidance from spiritual texts and practices.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Ketu in Favorable Position</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates spiritual detachment, deep meditation practices, and progress toward liberation. Strong inner spiritual transformation. Natural inclination toward renunciation and spiritual disciplines.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
