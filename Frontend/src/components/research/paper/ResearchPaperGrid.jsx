"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResearchPaperCard } from "./ResearchPaperCard";
export const papers = [
    {
        title: "Planetary Influences on Human Psychology",
        author: "Dr. A.K. Sharma",
        date: "Aug 2024",
        description: "A deep study analyzing how planetary positions influence emotional states and behavioral tendencies, referencing classic Jyotish texts with modern psychology.",
        link: "/research/research-papers/Paper",
        topic: "Jupiter",
    },
    {
        title: "Comparative Study of Nakshatras in Astrology",
        author: "Prof. Meena Rao",
        date: "Jan 2025",
        description: "This paper explores Nakshatras through empirical data and ancient sources, presenting their impact on personality and destiny.",
        link: "/research/research-papers/Paper",
        topic: "Moon",
    },
    {
        title: "Astrology and Karma Theory: A Vedic Analysis",
        author: "Swami Devendra",
        date: "Oct 2024",
        description: "An in-depth exploration of the link between planetary karma and human fate, bridging philosophy, astrology, and spirituality.",
        link: "/research/research-papers/Paper",
        topic: "Saturn",
    },
    {
        title: "Understanding Pitra Dosh and Its Remedies",
        author: "Dr. Priya Nair",
        date: "Nov 2024",
        description: "Comprehensive analysis of ancestral afflictions in Vedic astrology with effective remedial measures and case studies.",
        link: "/research/research-papers/Paper",
        topic: "Pitra Dosh",
    },
    {
        title: "Vastu Principles for Modern Architecture",
        author: "Ar. Rajesh Kumar",
        date: "Sep 2024",
        description: "Modern interpretation of Vastu Shastra principles applied to contemporary architectural design and space planning.",
        link: "/research/research-papers/Paper",
        topic: "Vastu",
    },
    {
        title: "Kalsarp Dosh: Myth or Reality?",
        author: "Dr. Suresh Pandey",
        date: "Dec 2024",
        description: "Critical examination of Kalsarp Dosh through statistical analysis and comparative studies of affected individuals.",
        link: "/research/research-papers/Paper",
        topic: "Kalsarp Dosh",
    },
    {
        title: "Solar Influence on Career and Leadership",
        author: "Prof. Amitabh Singh",
        date: "Aug 2024",
        description: "Research on Sun's role in shaping professional success, leadership qualities, and authority in individual horoscopes.",
        link: "/research/research-papers/Paper",
        topic: "Sun",
    },
    {
        title: "Rahu and Ketu: Shadow Planets Unveiled",
        author: "Dr. Radha Menon",
        date: "Oct 2024",
        description: "Deep dive into Rahu and Ketu's influence on material desires, spirituality, and karmic patterns in human life.",
        link: "/research/research-papers/Paper",
        topic: "Rahu",
    },
    {
        title: "Mercury's Impact on Communication and Intelligence",
        author: "Dr. Kavita Desai",
        date: "Jan 2025",
        description: "Study of Mercury's role in cognitive abilities, communication skills, and intellectual pursuits in astrology.",
        link: "/research/research-papers/Paper",
        topic: "Mercury",
    },
    {
        title: "Venus and Relationship Compatibility",
        author: "Dr. Rohan Verma",
        date: "Sep 2024",
        description: "Comprehensive analysis of Venus's influence on relationships, love, and marital harmony through case studies.",
        link: "/research/research-papers/Paper",
        topic: "Venus",
    },
    {
        title: "Mars and Mangal Dosha: Combatting the Myth",
        author: "Prof. Vikram Chaturvedi",
        date: "Nov 2024",
        description: "Critical analysis of Mars dosha in marriage compatibility with empirical evidence and practical solutions.",
        link: "/research/research-papers/Paper",
        topic: "Mangal Badh",
    },
    {
        title: "Stree Dosh and Women's Empowerment in Astrology",
        author: "Dr. Anjali Sharma",
        date: "Dec 2024",
        description: "Modern perspective on traditional concepts of Stree Dosh with emphasis on empowerment and practical solutions.",
        link: "/research/research-papers/Paper",
        topic: "Stree Shrap",
    },
];
export const ResearchPaperGrid = ({ searchQuery = "", selectedTopic, papers: passedPapers, onDeleteSuccess, showToast }) => {
    const activePapers = passedPapers && passedPapers.length > 0 ? passedPapers : papers;
    
    // Filter papers based on search query and selected topic
    const filteredPapers = useMemo(() => {
        let results = activePapers;
        // Filter by topic if selected
        if (selectedTopic) {
            results = results.filter((paper) => {
                const topicLower = selectedTopic.toLowerCase();
                const matchesTopic = paper.topic?.toLowerCase() === topicLower;
                const matchesTags = paper.tags?.some(tag => tag.toLowerCase() === topicLower);
                return matchesTopic || matchesTags;
            });
        }
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            results = results.filter((paper) => {
                const titleMatch = paper.title?.toLowerCase().includes(query);
                const authorMatch = paper.author?.toLowerCase().includes(query);
                const descMatch = paper.description?.toLowerCase().includes(query);
                const topicMatch = paper.topic?.toLowerCase().includes(query);
                const tagsMatch = paper.tags?.some(tag => tag.toLowerCase().includes(query));
                return titleMatch || authorMatch || descMatch || topicMatch || tagsMatch;
            });
        }
        return results;
    }, [activePapers, searchQuery, selectedTopic]);
    return (<section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
        Featured Research Papers
      </motion.h2>

      {/* Results Info */}
      {(searchQuery || selectedTopic) && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center text-sm text-gray-600">
          Found {filteredPapers.length} paper
          {filteredPapers.length !== 1 ? "s" : ""}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTopic && ` in ${selectedTopic}`}
        </motion.div>)}

      {/* No Results Message */}
      {filteredPapers.length === 0 ? (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-6">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No papers found
          </h3>
          <p className="text-gray-600 max-w-md">
            {searchQuery
                ? `We couldn't find any papers matching "${searchQuery}".`
                : `We couldn't find any papers for this topic.`}
            Try adjusting your search terms or selecting a different topic.
          </p>
        </motion.div>) : (
        /* Card Grid */
        <motion.div layout className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPapers.map((paper, idx) => (<motion.div key={`${paper.title || paper._id}-${idx}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}>
                <ResearchPaperCard {...paper} onDeleteSuccess={onDeleteSuccess} showToast={showToast}/>
              </motion.div>))}
          </AnimatePresence>
        </motion.div>)}
    </section>);
};
