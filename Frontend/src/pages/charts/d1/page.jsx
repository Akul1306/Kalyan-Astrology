// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D1 Lagna Chart - Birth Chart | Kalyan Dashboard",
    description: "Explore your D1 Lagna Chart, the primary birth chart representing your complete personality, life path, and karmic blueprint. Foundation of all Vedic astrological analysis.",
    keywords: "lagna chart, birth chart, d1 chart, vedic astrology, horoscope, kundli",
};
export default function D1ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D1 • Lagna Chart" subtitle="The primary birth chart representing your complete personality, life path, and karmic blueprint. This is the foundation of all astrological analysis in Vedic astrology."/>

        <ChartSwitcher chart={{
            chartType: "D1 - Lagna",
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
            <li>Complete personality structure and inherent character traits</li>
            <li>Physical appearance, constitution, and health patterns</li>
            <li>All twelve houses of life—career, relationships, health, spirituality, finances</li>
            <li>Planetary positions and their influences on your life</li>
            <li>Karmic blueprint and life purpose</li>
            <li>Overall life direction, potential, and destiny</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Lagna (Ascendant) chart is read counter-clockwise starting from the 1st house (top center). Each house represents different aspects of life, and planets placed in these houses reveal their influence on those specific areas. The sign on the Ascendant determines your rising sign and overall approach to life.
          </p>
          <p className="mb-4">
            Strong planets in angular houses (1, 4, 7, 10) have more power and influence. Planets in specific signs show their nature and expression. The 1st house represents self and personality, the 7th represents partnerships and marriage, the 10th represents career and reputation, and so on through all twelve houses.
          </p>
          <p>
            Astrologers analyze planetary aspects, conjunctions, and house lordships to understand the complete picture of your life patterns, strengths, and challenges.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Core Personality:</strong> Your fundamental nature, behavior patterns, and how others perceive you</li>
            <li><strong>Physical Traits:</strong> Appearance, health predispositions, and constitutional strengths</li>
            <li><strong>Career Path:</strong> Professional inclinations, success patterns, and reputation</li>
            <li><strong>Relationships:</strong> Marriage compatibility, partnership patterns, and social connections</li>
            <li><strong>Wealth & Finances:</strong> Earning potential, financial patterns, and material prosperity</li>
            <li><strong>Spirituality:</strong> Inner wisdom, spiritual inclinations, and karmic evolution</li>
            <li><strong>Life Challenges:</strong> Obstacles, lessons, and areas requiring attention</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D1 chart is the primary reference for all astrological analysis and predictions. It's essential for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Understanding your complete personality and life purpose</li>
            <li>Predicting major life events through Dasha (planetary period) analysis</li>
            <li>Determining compatibility in relationships and matchmaking (Kundli Milan)</li>
            <li>Career guidance and professional decision-making</li>
            <li>Health analysis and preventive measures</li>
            <li>Timing important life decisions and major changes</li>
            <li>Understanding karmic patterns and spiritual growth opportunities</li>
            <li>Daily horoscope predictions and transit influences</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical Vedic texts like <em>Brihat Parashara Hora Shastra</em> and <em>Jaimini Sutras</em>, the Lagna (Ascendant) is considered the most important point in the birth chart. It represents the soul's entry point into this lifetime.
          </p>
          <p>
            The Lagna Lord (ruler of the Ascendant sign) plays a crucial role in determining the overall strength and quality of life. The placement and condition of the Lagna Lord reveals the native's physical vitality, mental strength, and life span. Classical texts emphasize that a strong Lagna and Lagna Lord indicate a successful and fulfilled life.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong 10th House with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Planets in the 10th house indicate a strong career focus, public recognition, and professional success. The nature of planets shows career type—Jupiter suggests teaching or advisory roles, while Sun indicates leadership positions. This placement often brings authority, respect, and material prosperity through professional achievements.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">7th House Relationships</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                The 7th house reveals marriage, partnerships, and business relationships. Strong benefics like Venus and Jupiter here indicate harmonious partnerships, loving spouse, and successful business collaborations. Malefic influences may show challenges in relationships requiring understanding and remedies.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Lagna Strength</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                A strong Lagna with benefic influences in the 1st house indicates good health, confidence, positive life outlook, and strong physical constitution. The Lagna Lord's placement and aspects determine the overall quality of life and ability to overcome challenges.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
