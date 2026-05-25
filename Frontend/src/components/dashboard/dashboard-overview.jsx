"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useKundliStore } from "@/lib/store";
// ✅ Static, safe imports (no dynamic/lazy Promise issues)
import { KundliProfile } from "@/components/dashboard/info";
import AISection from "@/components/dashboard/AI-section";
import DashaSection from "@/components/dashboard/Dasha-section";
import { ChartSection } from "@/components/dashboard/MainChartSection";
import { DivisionalChartSection } from "@/components/dashboard/DivisionalChartSection";
import AdvancedChartSection from "@/components/dashboard/AdvancedChartSection";
import { CalculationSection } from "./CalculationSection";
export function DashboardOverview() {
    const { currentKundli } = useKundliStore();
    if (!currentKundli) {
        return (<div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-500">No Kundli data available</p>
      </div>);
    }
    return (<motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }} className="
        w-full overflow-hidden
        rounded-2xl border border-gray-100/80
        bg-white/90 backdrop-blur-sm
        shadow-[0_8px_32px_rgba(255,244,194,0.12)]
      ">
      {/* PROFILE */}
      <section className="px-6 py-8 sm:px-8 sm:py-10">
      <KundliProfile name={currentKundli.name ?? "Unknown"} dateOfBirth={currentKundli.dateOfBirth ?? "N/A"} timeOfBirth={currentKundli.personalInfo?.timeOfBirth ?? "N/A"} placeOfBirth={currentKundli.placeOfBirth ?? "N/A"} lagna={currentKundli.lagna}/>

      </section>

      <Divider />

      {/* MAIN CHARTS */}
      <SectionWrapper title="Main Charts">
        <ChartSection />
      </SectionWrapper>

      {/* DIVISIONAL */}
      <SectionWrapper title="Divisional Charts">
        <DivisionalChartSection />
      </SectionWrapper>

      {/* ADVANCED */}
      <SectionWrapper title="Advanced Charts">
        <AdvancedChartSection />
      </SectionWrapper>

      <Divider />

      {/* DASHA */}
      <SectionWrapper title="Dasha Predictions">
        <DashaSection />
      </SectionWrapper>

      <Divider />

      {/* AI TOOLS */}
      <SectionWrapper title="AI-Powered Tools">
        <AISection />
      </SectionWrapper>

      <SectionWrapper title="Calculations">
        <CalculationSection />
      </SectionWrapper>
    </motion.div>);
}
function Divider() {
    return <div className="border-t border-gray-100/60"/>;
}
function SectionWrapper({ title, children }) {
    return (<section className="space-y-6 px-6 py-10 sm:px-8 sm:py-12">
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-xl font-semibold tracking-tight text-gray-900">
        {title}
      </motion.h2>
      <div className="pt-1">{children}</div>
    </section>);
}
