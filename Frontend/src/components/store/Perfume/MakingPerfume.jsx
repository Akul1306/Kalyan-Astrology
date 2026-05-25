"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});
export default function MakingPerfume() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    // Parallax motion
    const parallaxUp = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);
    const parallaxDown = useTransform(scrollYProgress, [0, 1], ["6vh", "-6vh"]);
    // Idle float + soft rotation
    const float = {
        y: ["0%", "-8%", "0%"],
        rotate: ["0deg", "2deg", "-2deg", "0deg"],
        transition: {
            duration: 7,
            ease: "easeInOut",
            repeat: Infinity,
        },
    };
    return (<section ref={sectionRef} className="relative bg-pink-300/40 backdrop-blur-xl w-full overflow-visible py-28 md:py-36">
      {/* ========================= CONTENT ========================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 grid gap-14 md:gap-20">

        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative w-full max-w-[560px] mx-auto">
            <Image src="/Perfume/person.png" alt="Perfume Making" width={900} height={1100} className="w-full h-auto object-contain" quality={95}/>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center md:text-left">
            <h2 className={`${playfair.className} text-6xl md:text-6xl font-semibold text-black tracking-tight`}>
              Making Perfume
            </h2>
            <p className="mt-4 text-2xl md:text-2xl text-black/75 leading-relaxed max-w-md mx-auto md:mx-0">
              The craft of balancing top, heart, and base notes—creating a signature that feels uniquely yours.
            </p>
          </motion.div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
          
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="order-2 md:order-1 text-center md:text-left">
            <h3 className={`${playfair.className} text-6xl md:text-6xl font-semibold tracking-tight`}>
              Select Your Perfume
            </h3>
            <p className="mt-4 text-2xl md:text-2xl text-black/75 leading-relaxed max-w-md mx-auto md:mx-0">
              Explore refined blends—from bright citrus openings to warm, long-lasting ambers—curated for every mood.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2 relative w-full max-w-[560px] mx-auto">
            <Image src="/Perfume/person.png" alt="Choosing Perfume" width={900} height={1100} className="w-full h-auto object-contain" quality={95}/>
          </motion.div>
        </div>
      </div>

      {/* ========================= FLOATING FLOWERS ========================= */}

      {/* LEFT — TOP */}
      <motion.div aria-hidden style={{ y: parallaxUp }} animate={float} className="pointer-events-none absolute left-[-5vw] top-[6vh] z-[2]">
        <Image src="/Perfume/flower-1.png" alt="" width={260} height={260} className="w-[180px] md:w-[240px] opacity-85" quality={90}/>
      </motion.div>

      {/* RIGHT — MID */}
      <motion.div aria-hidden style={{ y: parallaxDown }} animate={float} className="pointer-events-none absolute right-[-4vw] top-[28vh] z-[2]">
        <Image src="/Perfume/flower-2.png" alt="" width={260} height={260} className="w-[170px] md:w-[230px] opacity-85" quality={90}/>
      </motion.div>

      {/* RIGHT — LOWER */}
      <motion.div aria-hidden style={{ y: parallaxUp }} animate={float} className="pointer-events-none absolute right-[-4vw] bottom-[18vh] z-[2]">
        <Image src="/Perfume/flower-3.png" alt="" width={260} height={260} className="w-[200px] md:w-[260px] opacity-85" quality={90}/>
      </motion.div>

      {/* LEFT — LOWER */}
      <motion.div aria-hidden style={{ y: parallaxDown }} animate={float} className="pointer-events-none absolute left-[-4vw] bottom-[26vh] z-[2]">
        <Image src="/Perfume/flower-4.png" alt="" width={240} height={240} className="w-[170px] md:w-[220px] opacity-85" quality={90}/>
      </motion.div>
    </section>);
}
