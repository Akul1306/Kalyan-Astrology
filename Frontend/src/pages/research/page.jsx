"use client";
import React from "react";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

export default function ResearchPage() {
    return (<main className="relative min-h-screen bg-transparent max-w-6xl mx-auto px-4 py-10">
      <MovingGradient />
			<h1 className="text-3xl font-bold text-gray-900 mb-4 relative z-10 font-poppins">Research Papers</h1>
			<p className="text-gray-600 mb-8 relative z-10">
				Curated academic papers and research materials in Vedic astrology. This is a placeholder page.
			</p>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
				<div className="rounded-xl border border-gray-100 bg-white/70 backdrop-blur-md p-6 shadow-sm">
					<h3 className="font-semibold text-gray-900">Coming soon</h3>
					<p className="text-sm text-gray-600">We are compiling peer-reviewed resources.</p>
				</div>
			</div>
		</main>);
}
