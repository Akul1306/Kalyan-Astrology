"use client";
import { motion } from "framer-motion";
import { Grid3X3, BarChart3, Activity, Eclipse, Orbit, } from "lucide-react";
import KundliButton from "./KundliButton";
export function CalculationSection() {
    const calculations = [
        {
            name: "Saptavarga",
            href: "/calculations/saptavarga",
            icon: Grid3X3,
        },
        {
            name: "Ashtakavarga",
            href: "/calculations/ashtakavarga",
            icon: BarChart3,
        },
        {
            name: "Shadbala",
            href: "/calculations/shadbala",
            icon: Activity,
        },
        {
            name: "Shadow Planets",
            href: "/calculations/shadow-planets",
            icon: Eclipse,
        },
        {
            name: "Transits",
            href: "/calculations/transits",
            icon: Orbit,
        },
    ];
    return (<section className="w-full py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }} className="
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
          gap-4 sm:gap-6 max-w-7xl mx-auto
        ">
        {calculations.map((item, index) => (<motion.div key={item.name} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.03 }}>
            <KundliButton name={item.name} href={item.href} Icon={item.icon}/>
          </motion.div>))}
      </motion.div>
    </section>);
}
