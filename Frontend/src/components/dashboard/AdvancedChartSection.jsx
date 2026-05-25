"use client";
import { motion } from "framer-motion";
import { Sparkles, Dna, Wrench, Users } from "lucide-react";
import KundliButton from "./KundliButton";
export default function AdvancedChartSection() {
    const tools = [
        { name: "Life Prediction Chart", href: "/advanced/life-prediction", icon: Sparkles },
        { name: "Cosmic DNA Chart", href: "/advanced/cosmic-dna", icon: Dna },
        { name: "Rectification Tools", href: "/advanced/rectification", icon: Wrench },
        { name: "Famous Comparison", href: "/advanced/celebrity-compare", icon: Users },
    ];
    return (<section className="w-full py-8 sm:py-12 flex justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-4 sm:gap-6
          max-w-7xl w-full
        ">
        {tools.map((tool, i) => (<motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <KundliButton name={tool.name} href={tool.href} Icon={tool.icon}/>
          </motion.div>))}
      </motion.div>
    </section>);
}
