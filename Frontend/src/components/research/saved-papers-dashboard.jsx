"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Tag, Wand2, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { DocumentCard } from "@/components/cards/document-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
const motionConfig = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
export function SavedPapersDashboard({ documents }) {
    const [activeTag, setActiveTag] = useState("All");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 360);
        return () => clearTimeout(timer);
    }, []);
    const tags = useMemo(() => ["All", ...new Set(documents.flatMap((doc) => doc.tags))], [documents]);
    const filteredDocuments = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        let list = activeTag === "All"
            ? documents
            : documents.filter((doc) => doc.tags.includes(activeTag));
        if (!q)
            return list;
        return list.filter((doc) => {
            const title = (doc.title || "").toLowerCase();
            const type = (doc.type || "").toLowerCase();
            return (title.includes(q) ||
                type.includes(q));
        });
    }, [documents, activeTag, searchQuery]);
    const rightPanel = (<QuickActionsPanel actions={[
            {
                icon: Download,
                label: "Export bundle",
                description: "Download a curated PDF bundle with annotations.",
                actionLabel: "Export",
            },
            {
                icon: Wand2,
                label: "AI summarize",
                description: "Generate a mono-style summary for the latest paper.",
                actionLabel: "Summarize",
            },
        ]}/>);
    return (<DashboardShell title="Saved papers" description="Research documents, assessments, and ritual notes kept in one calm view." rightPanel={rightPanel} actions={<Button className="rounded-full bg-gray-900 px-5 text-white">
          <Tag className="mr-2 h-4 w-4"/>
          New tag
        </Button>}>
      {/* TAGS + SEARCH BAR */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={motionConfig} className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-lg shadow-indigo-100 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (<Badge key={tag} variant={activeTag === tag ? "default" : "outline"} className={activeTag === tag
                ? "cursor-pointer rounded-full bg-gray-900 px-4 py-2 text-white"
                : "cursor-pointer rounded-full border-gray-200 px-4 py-2 text-gray-600"} onClick={() => setActiveTag(tag)}>
                {tag}
              </Badge>))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64 lg:w-72">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search title, type, notes..." className="w-full rounded-2xl border border-gray-200 bg-white/90 px-4 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-gray-900/10"/>
            <Search className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400"/>
          </div>
        </div>
      </motion.section>

      {/* DOCUMENT GRID / SKELETON */}
      {loading ? (<Skeleton className="mt-6 h-72 w-full rounded-3xl"/>) : (<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={motionConfig} className="mt-6 grid gap-5 md:grid-cols-2">
          {filteredDocuments.length === 0 ? (<div className="col-span-full rounded-3xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
              No documents match this filter. Try a different tag or search term.
            </div>) : (filteredDocuments.map((doc) => (<DocumentCard key={doc.id} {...doc}/>)))}
        </motion.section>)}
    </DashboardShell>);
}
