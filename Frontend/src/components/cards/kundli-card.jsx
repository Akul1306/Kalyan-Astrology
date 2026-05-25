"use client";
import { Download, ExternalLink, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function KundliCard({ title, chart, layer, updatedAt, energy, accentClass }) {
    return (<motion.div whileHover={{ y: -10, opacity: 0.98 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className={cn("group rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-indigo-50 backdrop-blur-xl", accentClass)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{chart}</p>
          <h3 className="mt-2 font-mono text-xl text-gray-900">{title}</h3>
        </div>
        <span className="rounded-full bg-gray-900/5 px-3 py-1 text-xs font-medium text-gray-600">{energy}</span>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-gray-200/80 bg-gray-50/60 p-4">
        <p className="text-sm font-semibold text-gray-500">{layer}</p>
        <p className="mt-2 text-sm text-gray-400">Updated {updatedAt}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="outline" size="sm" className="rounded-full border-gray-200 text-gray-700 shadow-none">
          <Download className="mr-2 h-4 w-4"/>
          Download
        </Button>
        <Button variant="outline" size="sm" className="rounded-full border-gray-200 text-gray-700 shadow-none">
          <Share2 className="mr-2 h-4 w-4"/>
          Share
        </Button>
        <Button size="sm" className="rounded-full bg-gray-900 px-4 text-white shadow">
          <ExternalLink className="mr-2 h-4 w-4"/>
          Open
        </Button>
      </div>
    </motion.div>);
}
