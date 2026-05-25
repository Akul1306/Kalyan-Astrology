"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import AstroProfileCard from "../../cards/AstroProfileCard";
import EditKundli from "./EditKundli";
const initialData = [
    {
        id: "k1",
        name: "John Doe",
        dob: "1990-01-01",
        tob: "12:00 PM",
        place: "New York, USA",
        gender: "Male",
        rashi: "Capricorn",
        nakshatra: "Ashwini",
        lagna: "Leo",
        createdAt: "2024-07-01T10:00:00Z",
        tags: ["client", "family"],
    },
    {
        id: "k2",
        name: "Priya Sharma",
        dob: "1996-05-18",
        tob: "06:45 AM",
        place: "Delhi, India",
        gender: "Female",
        rashi: "Taurus",
        nakshatra: "Rohini",
        lagna: "Virgo",
        createdAt: "2024-09-15T14:30:00Z",
        tags: ["vip"],
    },
    {
        id: "k3",
        name: "Arjun Patel",
        dob: "1988-11-09",
        tob: "02:20 AM",
        place: "Ahmedabad, India",
        gender: "Male",
        rashi: "Scorpio",
        nakshatra: "Anuradha",
        lagna: "Libra",
        createdAt: "2023-12-25T07:15:00Z",
        tags: ["research"],
    },
];
export function KundliDashboard() {
    const [data, setData] = useState(initialData);
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortBy, setSortBy] = useState("date");
    const [editing, setEditing] = useState(null);
    // TAG LIST
    const allTags = useMemo(() => {
        const t = new Set();
        data.forEach((d) => (d.tags || []).forEach((tag) => t.add(tag)));
        return Array.from(t);
    }, [data]);
    function onSave(updated) {
        setData((prev) => prev.map((d) => d.id === updated.id
            ? {
                ...d,
                ...updated,
                tags: typeof updated.tags === "string" ? updated.tags.split(",").map((s) => s.trim()) : updated.tags,
            }
            : d));
    }
    // FILTER + SORT (fully optimized)
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = data.filter((d) => {
            const matchesQuery = !q ||
                d.name.toLowerCase().includes(q) ||
                d.place.toLowerCase().includes(q) ||
                d.rashi.toLowerCase().includes(q);
            const matchesTag = !selectedTag || (d.tags || []).includes(selectedTag);
            return matchesQuery && matchesTag;
        });
        if (sortBy === "date")
            list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        if (sortBy === "name")
            list.sort((a, b) => a.name.localeCompare(b.name));
        if (sortBy === "rashi")
            list.sort((a, b) => a.rashi.localeCompare(b.rashi));
        return list;
    }, [data, query, selectedTag, sortBy]);
    return (<DashboardShell title="Kundli Cloud" description="Search, sort, and curate every saved chart in one calm space.">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          {/* Title */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-mono font-semibold text-gray-900">
              Kundli Cloud Storage
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              All stored charts — search, sort and tag them.
            </p>
          </div>

          {/* SEARCH + SORT */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, place, rashi..." className="w-full rounded-xl border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"/>
            </div>

            {/* Sort */}
            <select title="Sort by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border border-yellow-100 bg-white px-3 py-2 text-sm w-full sm:w-auto">
              <option value="date">Sort: Newest</option>
              <option value="name">Sort: Name</option>
              <option value="rashi">Sort: Rashi</option>
            </select>

            {/* Reset */}
            <button onClick={() => {
            setSelectedTag(null);
            setQuery("");
        }} className="rounded-xl border border-yellow-100 bg-white px-3 py-2 text-sm">
              Reset
            </button>
          </div>
        </div>

        {/* TAGS */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide w-full sm:w-auto">
            Folders
          </span>

          {/* All Btn */}
          <button onClick={() => setSelectedTag(null)} className={`rounded-full px-3 py-1 text-sm ${!selectedTag
            ? "bg-yellow-100 text-yellow-900"
            : "bg-white border border-yellow-100 text-gray-700"}`}>
            All
          </button>

          {/* Tag Buttons */}
          {allTags.map((t) => (<button key={t} onClick={() => setSelectedTag(t)} className={`rounded-full px-3 py-1 text-sm ${selectedTag === t
                ? "bg-yellow-100 text-yellow-900"
                : "bg-white border border-yellow-100 text-gray-700"}`}>
              {t}
            </button>))}
        </div>

        {/* GRID */}
        <motion.div layout className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 && (<div className="col-span-full rounded-2xl border border-yellow-100 bg-white p-8 text-center">
              <p className="text-gray-600">
                No kundlis found. Try a different search or create a new kundli.
              </p>
            </div>)}

          {filtered.map((k) => (<motion.div key={k.id} layout whileHover={{ y: -4 }} className="transition-transform">
              <AstroProfileCard {...k} onView={(id) => {
                // Navigate to view kundli details
                if (process.env.NODE_ENV === "development") {
                    console.log("View", id);
                }
            }} onEdit={(id) => {
                const payload = data.find((d) => d.id === id);
                const { onView, onEdit, ...rest } = payload;
                setEditing({
                    id,
                    payload: {
                        ...rest,
                        tags: (payload.tags || []).join(", "),
                    },
                });
            }}/>
            </motion.div>))}
        </motion.div>

        {/* EDIT MODAL */}
        {editing && (<EditKundli open={true} onClose={() => setEditing(null)} data={editing.payload} onSave={(updated) => {
                onSave({ ...updated, id: editing.id });
                setEditing(null);
            }}/>)}
      </div>
    </DashboardShell>);
}
