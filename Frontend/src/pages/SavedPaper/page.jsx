"use client";
import React, { useState, useEffect } from "react";
import { SavedPapersDashboard } from "@/components/research/saved-papers-dashboard";
import { savedPapers as fallbackPapers } from "@/lib/dashboard-data";
import { useKundliStore } from "@/lib/store";

export default function SavedPapersPage() {
    const { token, isAuthenticated } = useKundliStore();
    const [papers, setPapers] = useState(fallbackPapers);

    useEffect(() => {
        const fetchSavedPapers = async () => {
            if (!isAuthenticated || !token) {
                return;
            }
            try {
                const response = await fetch("/api/papers/saved", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === "success" && data.data?.papers) {
                        // Map backend Paper schema to DocumentCard expected props
                        const mapped = data.data.papers.map((p) => ({
                            id: p._id,
                            title: p.title,
                            type: p.category,
                            tags: p.tags || [],
                            updatedAt: new Date(p.updatedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }),
                            preview: p.preview || p.description || "",
                            downloadUrl: p.fileUrl,
                        }));
                        // Only set if we actually have saved papers, otherwise keep fallback mock items for full showcase
                        if (mapped.length > 0) {
                            setPapers(mapped);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching saved papers:", error);
            }
        };

        fetchSavedPapers();
    }, [token, isAuthenticated]);

    return <SavedPapersDashboard documents={papers}/>;
}

