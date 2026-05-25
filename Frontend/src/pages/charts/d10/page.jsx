// Force dynamic rendering to prevent SSR issues with client-only components
export const dynamic = "force-dynamic";
import { DivisionalChartHeader } from "@/components/charts/divisional-chart-header";
import { ChartSwitcher } from "@/components/charts/ChartSwitcher";
import { ChartSection } from "@/components/charts/chart-section";
export const metadata = {
    title: "D10 Dasamsa Chart - Career & Profession | Kalyan Dashboard",
    description: "Explore your D10 Dasamsa Chart for career analysis, profession, reputation, social status, and professional achievements throughout life.",
    keywords: "dasamsa chart, d10 chart, career, profession, reputation, vedic astrology",
};
export default function D10ChartPage() {
    return (<main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <DivisionalChartHeader title="D10 • Dasamsa Chart" subtitle="Career, Profession, and Reputation. A divisional chart dedicated to career, profession, reputation, social status, and professional achievements throughout life."/>

        <ChartSwitcher chart={{
            chartType: "D10 - Dasamsa",
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
            <li>Career and profession</li>
            <li>Professional achievements and reputation</li>
            <li>Social status and recognition</li>
            <li>Professional skills and expertise</li>
            <li>Career growth and promotions</li>
            <li>Authority and power in profession</li>
          </ul>
        </ChartSection>

        <ChartSection title="How Astrologers Interpret This Chart" delay={0.1}>
          <p className="mb-4">
            The Dasamsa chart divides each sign into ten equal parts. This chart is specifically designed to analyze career matters, professional success, and reputation.
          </p>
          <p>
            The 10th house (Karma Bhava - house of career) is most significant for career. Strong planets here indicate professional success, recognition, and authority. Saturn and Sun are particularly important—Saturn for service and discipline, Sun for leadership and authority. Benefic influences show career growth and professional fulfillment.
          </p>
        </ChartSection>

        <ChartSection title="What This Chart Reveals in Your Life" delay={0.2}>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li><strong>Career Type:</strong> Nature of profession and career path</li>
            <li><strong>Professional Success:</strong> Achievements and recognition in career</li>
            <li><strong>Reputation:</strong> Social status and public recognition</li>
            <li><strong>Authority:</strong> Leadership abilities and power in profession</li>
            <li><strong>Career Growth:</strong> Promotion patterns and professional development</li>
            <li><strong>Professional Skills:</strong> Expertise and specializations</li>
            <li><strong>Career Honors:</strong> Recognition and awards in profession</li>
          </ul>
        </ChartSection>

        <ChartSection title="When This Chart Becomes Important" delay={0.3}>
          <p className="mb-4">
            The D10 Dasamsa chart is essential for:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Career guidance and profession selection</li>
            <li>Predicting professional success and growth</li>
            <li>Understanding reputation and social status</li>
            <li>Timing career changes and promotions</li>
            <li>Analyzing professional relationships</li>
            <li>Assessing authority and leadership potential</li>
            <li>Predicting career milestones and achievements</li>
          </ul>
        </ChartSection>

        <ChartSection title="Classical References" delay={0.4}>
          <p className="mb-4">
            According to classical texts, Dasamsa (one-tenth division) is specifically for analyzing career and profession (Karma). The 10th house is Karma Bhava (house of career and actions).
          </p>
          <p>
            Sun represents authority, leadership, and government positions. Saturn represents service, discipline, and career longevity. Jupiter indicates teaching, advisory, or wisdom-based professions. When these planets are strong in the 10th house, the native achieves professional success and recognition. Raj Yoga (royal combinations) in this chart indicate high professional achievement.
          </p>
        </ChartSection>

        <ChartSection title="Sample Analysis" delay={0.5}>
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Strong 10th House with Benefics</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates successful career, professional recognition, and authority. Career brings reputation and social status. Professional fulfillment throughout life with steady growth and achievements.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Sun-Saturn Combination</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Suggests career in government, administration, or leadership roles. Success through discipline, hard work, and authoritative positions. Long-lasting professional career with authority and respect.
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50/80 to-yellow-50/40 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-r-xl shadow-sm">
              <p className="font-semibold text-gray-900 mb-2 text-lg">Jupiter in 10th House</p>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Indicates career in teaching, advisory roles, law, or wisdom-based professions. Professional growth through knowledge and guidance. Respected position in academic or advisory fields.
              </p>
            </div>
          </div>
        </ChartSection>
      </div>
    </main>);
}
