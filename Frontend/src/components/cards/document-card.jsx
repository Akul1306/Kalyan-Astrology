"use client";
import { FileText, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export function DocumentCard({ title, type, tags, updatedAt, preview }) {
    return (<motion.article whileHover={{ y: -10, opacity: 0.98 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-indigo-50 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-400"/>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">{type}</span>
        </div>
        <span className="text-xs text-gray-500">{updatedAt}</span>
      </div>

      <h3 className="mt-4 font-mono text-xl text-gray-900">{title}</h3>
      <p className="mt-3 text-sm text-gray-500">{preview}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (<Badge key={tag} variant="outline" className="rounded-full border-gray-200 text-gray-600">
            {tag}
          </Badge>))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-6">

        <Button variant="outline" size="sm" className="rounded-full border-gray-200 text-gray-700">
          Preview
          <MoveRight className="ml-2 h-4 w-4"/>
        </Button>
      </div>
    </motion.article>);
}
