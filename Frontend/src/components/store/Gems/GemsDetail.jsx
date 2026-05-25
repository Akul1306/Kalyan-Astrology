// components/GemsDetail.tsx
"use client";
import React from "react";
import { Playfair_Display as PlayfairDisplay, Inter } from "next/font/google";
import { motion } from "framer-motion";
const playfair = PlayfairDisplay({
    weight: ["600", "700"],
    subsets: ["latin"],
    display: "swap",
});
const inter = Inter({ subsets: ["latin"], display: "swap" });
const defaultSpecs = [
    { label: "Color", value: "Blue" },
    { label: "Weight/Size", value: "4.12 Carat (4.50 Ratti)" },
    { label: "Shape / Cut", value: "Oval Mix" },
    { label: "Dimensions (L x W x H)", value: "10.10 x 8.47 x 5.37" },
    { label: "Country of Origin", value: "Ceylon (Sri Lanka)" },
    { label: "Finish", value: "Very Good" },
    { label: "Refractive Index", value: "1.76 - 1.77" },
    { label: "Specific Gravity", value: "4.00" },
    { label: "Certification", value: "Govt. Lab IIGJ Certified (IGI - GTL)" },
];
export default function GemsDetail({ specs = defaultSpecs, description = (<>
      Natural Blue Sapphire (Neelam in Hindi) weighing 4.12 Carat (4.50 Ratti) of Sri Lanka
      (Ceylon) Origin. This gemstone is unheated & untreated and certified by Govt. lab
      IIGJ (IGI - GTL). It is ideal for astrological use (Shani / Saturn), and recommended for
      rings or pendants to benefit wealth, fortune and success.
    </>), benefits = (<>
      Most powerful astrological gemstone associated with Saturn (Shani). Brings wealth,
      good fortune & fame to the wearer. Helps in growth & success in business, career and
      personal endeavours.
    </>), badges = ["Good Fortune", "Wealth", "New Opportunities", "Business Success"], className, }) {
    return (<section aria-label="Gems details" className={[
            "w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-8",
            className || "",
        ].join(" ")}>
      {/* optional badges row */}
      {badges && badges.length > 0 && (<div className="mb-6">
          <div className="w-full rounded-md bg-neutral-50/80 dark:bg-neutral-900/40 py-3 px-4 flex flex-wrap gap-4 justify-center">
            {badges.map((b, i) => (<span key={`${b}-${i}`} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-amber-700" style={{ fontFamily: inter.className }} role="note" aria-label={b}>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="10" fill="#00C853"/>
                  <path d="M8 12.5l2.2 2L16 9" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {b}
              </span>))}
          </div>
        </div>)}

      {/* main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* left specs panel */}
        <motion.aside initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, ease: "easeOut" }} className="lg:col-span-5">
          <div className="border border-neutral-200 rounded-md p-6 bg-white/60 dark:bg-neutral-900/40" role="region" aria-label="Gems specifications">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {specs.map((s, idx) => (<div key={`${String(s.label)}-${idx}`} className="min-h-[48px]">
                  <dt className="text-sm font-medium text-amber-800 mb-1" style={{ fontFamily: playfair.className }}>
                    {s.label}
                  </dt>
                  <dd className="text-sm text-neutral-700 dark:text-neutral-300" style={{ fontFamily: inter.className }}>
                    {s.value}
                  </dd>
                </div>))}
            </dl>

            {/* verify / CTA row */}
            <div className="mt-6 border-t pt-4 flex items-center gap-3">
              <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline" onClick={() => {
            if (typeof window !== "undefined") {
                window.alert("Open certification verification (implement in page).");
            }
        }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2l2.5 4.8L20 9l-4 3.9.9 5.1L12 16.8 7.1 18l.9-5.1L4 9l5.5-2.2L12 2z" fill="#10B981"/>
                </svg>
                Verify
              </button>
              <span className="text-xs text-neutral-400 ml-auto" style={{ fontFamily: inter.className }}>
                Certified gemstone
              </span>
            </div>
          </div>
        </motion.aside>

        {/* right description */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.6, ease: "easeOut" }} className="lg:col-span-7" aria-label="Description and benefits">
          <div className="bg-white/60 dark:bg-neutral-900/40 p-6 rounded-md">
            {/* Description */}
            <header className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-amber-800" style={{ fontFamily: playfair.className }}>
                DESCRIPTION
              </h3>

              <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" style={{ fontFamily: inter.className }}>
                {description}
              </div>
            </header>

            {/* divider */}
            <div className="my-4 border-t border-neutral-200"/>

            {/* Benefits */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-amber-800" style={{ fontFamily: playfair.className }}>
                BENEFITS
              </h4>
              <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" style={{ fontFamily: inter.className }}>
                {benefits}
              </div>

              {/* small CTA row for actions */}
              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <button className="inline-flex items-center gap-2 rounded-md bg-amber-700 px-4 py-2 text-white text-sm shadow-sm hover:shadow-md transition" onClick={() => {
            if (typeof window !== "undefined") {
                window.alert("Add to cart — integrate your function");
            }
        }}>
                  Add to Cart
                </button>

                <button className="inline-flex items-center gap-2 rounded-md border border-amber-700 px-4 py-2 text-amber-700 text-sm hover:bg-amber-50 transition" onClick={() => {
            if (typeof window !== "undefined") {
                window.alert("Request video call — integrate your function");
            }
        }}>
                  Request Video Call
                </button>

                <span className="ml-auto text-xs text-neutral-500" style={{ fontFamily: inter.className }}>
                  <strong>30 Day Returnable</strong> • Lifetime Exchange & Buy-Back
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </section>);
}
