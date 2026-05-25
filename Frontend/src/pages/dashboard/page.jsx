"use client";
import { useState } from "react";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { useKundliStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import Link from "next/link";
import { motion } from "framer-motion";
export default function DashboardPage() {
    const { currentKundli } = useKundliStore();
    const [selectedChart, setSelectedChart] = useState(null);
    if (!currentKundli) {
        return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center shadow-[0_8px_32px_rgba(255,244,194,0.3)]">
              <span className="text-3xl">📊</span>
            </div>
          </motion.div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Kundli Found</h2>
          <p className="text-gray-600 mb-6">Please generate a Kundli first to view your dashboard.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white shadow-[0_4px_12px_rgba(255,244,194,0.4)]">
              Generate Kundli
            </Button>
          </Link>
        </div>
      </motion.div>);
    }
    return (<div className="max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
          Kundli Dashboard
        </h1>
        <p className="text-gray-600 text-lg">View and analyze your generated Kundli charts and predictions</p>
      </motion.div>

      {/* Dashboard Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} onClick={() => setSelectedChart({
            data: currentKundli.charts.birthChart,
            title: "Birth Chart",
        })}>
        <DashboardOverview />
      </motion.div>
    </div>);
}
