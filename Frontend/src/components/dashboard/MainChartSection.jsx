"use client";
import React from "react";
import { motion } from "framer-motion";
import { KundliChart } from "@/components/charts/kundli-chart";
import { useKundliStore } from "@/lib/store";
import { GlowCard } from "@/components/ui/glow-card";
import { Compass, Home, Share2, Sparkles, Sun } from "lucide-react";
import KundliButton from "./KundliButton";
/**
 * ChartSection - Main dashboard section displaying Kundli charts and chart tools.
 * Features animated grid layouts with premium button components.
 */
export function ChartSection() {
    const { currentKundli } = useKundliStore();
    // Chart definitions
    const charts = [
        { key: "birthChart", title: "Birth Chart" },
        { key: "navamsa", title: "Navamsa Chart" },
        { key: "dashamsa", title: "Dashamsa Chart" },
    ];
    // Chart tools
    const chartTools = [
        { name: "D1 - Lagna Chart", href: "/charts/d1", Icon: Compass },
        { name: "Planetary Positions", href: "/charts/planets", Icon: Sun },
        { name: "House Report", href: "/charts/houses", Icon: Home },
        { name: "Aspects & Conjunctions", href: "/charts/aspects", Icon: Share2 },
        { name: "Yogas & Doshas", href: "/charts/yogas", Icon: Sparkles },
    ];
    // Early return if no Kundli data
    if (!currentKundli) {
        return (<p className="text-center text-gray-500">No Kundli data available</p>);
    }
    return (<div className="space-y-12 sm:space-y-16">
      {/* User Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {charts.map((chart, index) => (<motion.div key={chart.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
            <GlowCard glowIntensity="subtle" className="overflow-hidden">
              <div className="p-4 sm:p-6">
                <KundliChart chartData={currentKundli.charts[chart.key]} title={chart.title} size="medium"/>
              </div>
            </GlowCard>
          </motion.div>))}
      </div>

      {/* Chart Tools Grid */}
      <section className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {chartTools.map((tool, i) => (<motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <KundliButton name={tool.name} href={tool.href} Icon={tool.Icon}/>
            </motion.div>))}
        </motion.div>
      </section>
    </div>);
}
// Export with original name for backward compatibility
export const Chartsection = ChartSection;
