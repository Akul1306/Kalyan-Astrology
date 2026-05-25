// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D3 Drekkana Chart - Siblings & Courage | Kalyan Dashboard",
    description: "Explore your D3 Drekkana Chart for analyzing siblings, courage, valor, communication skills, and short journeys. Understand your relationship with brothers and sisters.",
    keywords: "drekkana chart, d3 chart, siblings, courage, communication, vedic astrology",
};
export default function D3ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D3 • Drekkana Chart" subtitle="Siblings, Courage, and Communication. A divisional chart focusing on sibling relationships, courage, valor, communication skills, and short journeys."/>

        <ChartSwitcher chart={{
            chartType: "D3 - Drekkana",
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
            <li>Sibling relationships and their nature</li>
            <li>Courage, valor, and bravery in facing challenges</li>
            <li>Communication skills and self-expression</li>
            <li>Short journeys and travels</li>
            <li>Mental strength and determination</li>
            <li>Ability to overcome obstacles</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Drekkana chart divides each sign into three equal parts of 10 degrees each, representing the three gunas (qualities) of nature—Sattva (purity), Rajas (activity), and Tamas (inertia). This chart specifically reveals information about siblings, courage, and communication.
          </p>
          <p>
            The 3rd house in this chart is particularly significant for siblings, while planets in angular positions indicate levels of courage and valor. Benefic influences show supportive siblings and strong communication skills. Mars, the natural significator of courage, plays a key role in this chart.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Sibling Relations:</strong> Number and nature of siblings, relationship dynamics</li>
            <li><strong>Courage Levels:</strong> Bravery in facing challenges and obstacles</li>
            <li><strong>Communication:</strong> Speaking abilities, writing skills, and self-expression</li>
            <li><strong>Short Journeys:</strong> Travel patterns and inclination toward local travels</li>
            <li><strong>Mental Strength:</strong> Determination and ability to overcome difficulties</li>
            <li><strong>Writing Abilities:</strong> Literary skills and communication through writing</li>
            <li><strong>Competitive Spirit:</strong> Ability to compete and win in challenges</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D3 Drekkana chart is valuable for understanding:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Sibling relationships and their impact on your life</li>
            <li>Assessing courage and ability to face life's challenges</li>
            <li>Understanding communication patterns and skills</li>
            <li>Predicting short journeys and travels</li>
            <li>Career choices involving communication or writing</li>
            <li>Timing activities requiring courage and determination</li>
            <li>Relationships with extended family and cousins</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to <em>Brihat Parashara Hora Shastra</em>, the Drekkana (one-third division) represents siblings, courage, and communication. The 3rd house (Sahaja Bhava) is the house of siblings, courage, and writing abilities.
          </p>
          <p>
            Mars is the natural significator of the 3rd house and represents courage, valor, and siblings. A strong Mars in favorable position indicates courageous personality and supportive siblings. Mercury governs communication and writing, making it important for assessing communication skills in this chart.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong Mars in 3rd House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates courageous personality, protective siblings, and ability to face challenges fearlessly. Natural leadership qualities and competitive spirit. Strong determination to overcome obstacles.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Mercury with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests excellent communication skills, writing abilities, and harmonious relationship with siblings through good dialogue. Natural talent for writing, teaching, or communication-based careers.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Multiple Planets in 3rd House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                May indicate multiple siblings or strong influence of siblings in life. Enhanced courage and communication abilities. Strong bond with extended family and cousins.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
