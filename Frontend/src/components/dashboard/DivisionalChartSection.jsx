"use client";
import { motion } from "framer-motion";
import { PanelTop, PanelRight, PanelLeft, Square, Grid3X3, LayoutGrid, AppWindow, Grid, Layers, Boxes, SquareStack, Shield, Component, } from "lucide-react";
import KundliButton from "./KundliButton";
export function DivisionalChartSection() {
    const divisionalCharts = [
        { name: "D2 - Hora", href: "/charts/d2", icon: PanelTop },
        { name: "D3 - Drekkana", href: "/charts/d3", icon: PanelRight },
        { name: "D4 - Chaturthamsa", href: "/charts/d4", icon: PanelLeft },
        { name: "D7 - Saptamsa", href: "/charts/d7", icon: Square },
        { name: "D9 - Navamsa", href: "/charts/d9", icon: Grid3X3 },
        { name: "D10 - Dasamsa", href: "/charts/d10", icon: LayoutGrid },
        { name: "D12 - Dwadashamsa", href: "/charts/d12", icon: AppWindow },
        { name: "D16 - Kalamsa", href: "/charts/d16", icon: Grid },
        { name: "D20 - Vimsamsa", href: "/charts/d20", icon: Layers },
        { name: "D24 - Chaturvimshamsa", href: "/charts/d24", icon: Boxes },
        { name: "D30 - Trimshamsa", href: "/charts/d30", icon: SquareStack },
        { name: "D45 - Akshavedamsa", href: "/charts/d45", icon: Shield },
        { name: "D60 - Shashtiamsa", href: "/charts/d60", icon: Component },
    ];
    return (<section className="w-full py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }} className="
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
          gap-4 sm:gap-6 max-w-7xl mx-auto
        ">
        {divisionalCharts.map((chart, index) => (<motion.div key={chart.name} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.03 }}>
            <KundliButton name={chart.name} href={chart.href} Icon={chart.icon}/>
          </motion.div>))}
      </motion.div>
    </section>);
}
