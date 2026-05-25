"use client";
import { motion } from "framer-motion";
import { Layers, CircleDot, Orbit, Sparkles, CalendarDays } from "lucide-react";
import KundliButton from "./KundliButton";
export default function DashaSection() {
    const dashaServices = [
        { name: "All Dasha Overview", href: "/dasha", icon: Layers },
        { name: "Vimshottari Dasha", href: "/dasha/vimshottari", icon: CircleDot },
        { name: "Chara Dasha", href: "/dasha/chara", icon: Orbit },
        { name: "Yogini Dasha", href: "/dasha/yogini", icon: Sparkles },
        { name: "Varshphal (Annual)", href: "/dasha/varshphal", icon: CalendarDays },
    ];
    return (<section className="w-full py-8 sm:py-12 flex justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-4 sm:gap-6
          max-w-6xl w-full
        ">
        {dashaServices.map((service, i) => (<motion.div key={service.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <KundliButton name={service.name} href={service.href} Icon={service.icon}/>
          </motion.div>))}
      </motion.div>
    </section>);
}
