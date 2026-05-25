"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
export function QuickActionsPanel({ title = "Quick Actions", actions }) {
    return (<motion.aside initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl shadow-indigo-100 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{title}</p>
      <div className="mt-4 space-y-4">
        {actions.map((action) => (<div key={action.label} className="rounded-2xl border border-gray-100/70 bg-gray-50/60 p-4">
            <div className="flex items-center gap-2">
              <action.icon className="h-4 w-4 text-indigo-400"/>
              <p className="font-mono text-sm text-gray-900">{action.label}</p>
            </div>
            <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            <Button variant="ghost" size="sm" className="mt-3 rounded-full px-3 text-gray-700 hover:bg-white" onClick={action.onClick}>
              {action.actionLabel}
            </Button>
          </div>))}
      </div>
    </motion.aside>);
}
