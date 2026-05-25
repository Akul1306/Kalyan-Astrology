// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D45 Akshavedamsa Chart - Character & Nature | Kalyan Dashboard",
    description: "Explore your D45 Akshavedamsa Chart for analyzing deep character traits, inner nature, behavioral patterns, and fundamental personality characteristics.",
    keywords: "akshavedamsa chart, d45 chart, character, nature, personality, vedic astrology",
};
export default function D45ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D45 • Akshavedamsa Chart" subtitle="Character, Nature, and Inner Self. A divisional chart analyzing deep character traits, inner nature, behavioral patterns, and fundamental personality characteristics."/>

        <ChartSwitcher chart={{
            chartType: "D45 - Akshavedamsa",
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
            <li>Deep character traits and nature</li>
            <li>Inner personality and behavioral patterns</li>
            <li>Fundamental characteristics</li>
            <li>True nature beneath the surface</li>
            <li>Innate qualities and tendencies</li>
            <li>Core personality structure</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Akshavedamsa chart divides each sign into forty-five equal parts. This chart reveals the deepest character traits and fundamental nature of an individual.
          </p>
          <p>
            The Lagna and planets in this chart show the true inner nature. Benefic influences reveal positive character traits, while malefic influences may show challenging aspects. This chart helps understand why people behave in certain ways at their core level.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Core Character:</strong> Fundamental nature and personality traits</li>
            <li><strong>Inner Self:</strong> True nature beneath external appearances</li>
            <li><strong>Behavioral Patterns:</strong> Inherent tendencies and patterns</li>
            <li><strong>Fundamental Traits:</strong> Essential characteristics that define you</li>
            <li><strong>Core Values:</strong> Deep-seated principles and beliefs</li>
            <li><strong>Innate Qualities:</strong> Natural inclinations and tendencies</li>
            <li><strong>True Nature:</strong> Authentic self beyond social masks</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D45 Akshavedamsa chart is valuable for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Understanding deep character traits and inner nature</li>
            <li>Recognizing behavioral patterns and tendencies</li>
            <li>Understanding fundamental personality</li>
            <li>Self-awareness and personal growth</li>
            <li>Understanding true motivations</li>
            <li>Recognizing core values and principles</li>
            <li>Personal development and transformation</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Akshavedamsa (one-forty-fifth division) reveals the deepest character and nature. The Lagna represents the core personality, while planets show their influence on character.
          </p>
          <p>
            Strong benefics like Jupiter and Venus indicate noble character and positive traits. The Moon shows emotional nature, while the Sun reveals ego and identity. Understanding this chart helps in self-awareness and personal growth.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Lagna with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates noble character, integrity, and positive personality traits. Core nature is balanced, ethical, and well-disposed toward others. Natural leadership and trustworthy nature.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Moon in Favorable Position</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests emotional stability, caring nature, and intuitive understanding. Inner feelings are positive and well-balanced. Natural empathy and emotional intelligence.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Sun-Jupiter Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates leadership qualities, wisdom, and ethical character. Core nature is responsible, principled, and noble. Strong sense of duty and righteousness.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
