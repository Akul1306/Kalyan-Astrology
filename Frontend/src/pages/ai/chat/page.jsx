"use client";
import React, { useState, useEffect, useRef } from "react";
import AIChatBot from "@/components/Chatbot/AIChatBot";
import MovingGradient from "@/components/store/Perfume/MovingGradient";
import { Search, Loader2, Sparkles, BookOpen, Calculator, Award, Compass, Copy, Printer, Check } from "lucide-react";
import { useKundliStore } from "@/lib/store";
import { kundliAPI } from "@/lib/api";
import { NorthIndianChart } from "@/components/charts/north/NorthIndianChart";
import D3SvgViewer from "@/components/charts/D3SvgViewer";
import Link from "next/link";

const CATEGORIES = [
    { id: "all", label: "All Reports", icon: Sparkles },
    { id: "planets", label: "Planets & Houses", icon: Compass },
    { id: "signs", label: "Ascendant & Signs", icon: BookOpen },
    { id: "vedic", label: "Suggestions & Tables", icon: Calculator },
    { id: "yogas", label: "Yogas & Predictions", icon: Award }
];

const ASTRO_TABS = [
    { id: "planet_details", label: "Planet Details", category: "planets", prompt: "Hi what are my planet details" },
    { id: "planet_report", label: "Planet Report", category: "planets", prompt: "what is my planet report" },
    { id: "planetary_aspects", label: "Planetary Aspects", category: "planets", prompt: "what are my planetary aspects" },
    { id: "planets_in_houses", label: "Planets in Houses", category: "planets", prompt: "what are my planets in houses" },
    { id: "personal_char", label: "Personal Characteristics", category: "planets", prompt: "what are my personal characteristics" },
    { id: "divisional_charts", label: "Divisional Charts", category: "planets", prompt: "what are my divisional charts" },
    { id: "chart_image", label: "Chart Image (SVG)", category: "planets", prompt: "give me my chart image" },
    
    { id: "ascendant_report", label: "Ascendant Report", category: "signs", prompt: "what is my ascendant report" },
    { id: "find_ascendant", label: "Find Ascendant", category: "signs", prompt: "find ascendant" },
    { id: "find_moon_sign", label: "Find Moon Sign", category: "signs", prompt: "find moon sign" },
    { id: "find_sun_sign", label: "Find Sun Sign", category: "signs", prompt: "find sun sign" },
    { id: "extended_kundli", label: "Extended Kundli Details", category: "signs", prompt: "what are my extended kundli details" },
    { id: "shadbala", label: "Shadbala", category: "signs", prompt: "what is my shadbala" },

    { id: "gem_suggestion", label: "Gem Suggestion", category: "vedic", prompt: "what is my gem suggestion" },
    { id: "rudraksha_suggestion", label: "Rudraksha Suggestion", category: "vedic", prompt: "what is my rudraksha suggestion" },
    { id: "numero_table", label: "Numero Table", category: "vedic", prompt: "what is my numero table" },
    { id: "sade_sati", label: "Sade Sati Table", category: "vedic", prompt: "what is my sade sati table" },
    { id: "varshapal_month", label: "Varshapal Month Chart", category: "vedic", prompt: "what is my varshapal month chart" },

    { id: "twelve_month_pred", label: "AI 12-Month Prediction", category: "yogas", prompt: "what is my AI 12-month prediction" },
    { id: "yoga_calc", label: "Yoga Calculator", category: "yogas", prompt: "what is my yoga calculator" },
    { id: "yoga_list", label: "Yoga List", category: "yogas", prompt: "what is my yoga list" },
    { id: "mahadasha_full", label: "Current mahadasha full", category: "yogas", prompt: "what is my current mahadasha full" },
    { id: "mahadasha_short", label: "Current mahadasha", category: "yogas", prompt: "what is my current mahadasha" }
];

const signNumbers = {
    Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
    Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
};

const parseDynamicChartData = (reportText, rawKundli) => {
    let ascendantName = rawKundli?.lagna || rawKundli?.ascendant || rawKundli?.chartData?.ascendant || rawKundli?.personalInfo?.rashi || "Aries";
    let ascendantNumber = signNumbers[ascendantName] || 1;
    
    let planetsList = [];
    const sourcePlanets = rawKundli?.chartData?.planetaryPositions || rawKundli?.planetaryPositions || [];
    if (sourcePlanets && sourcePlanets.length > 0) {
        planetsList = sourcePlanets.map(p => ({
            name: p.planet,
            house: Number(p.house),
            abbreviation: p.planet.substring(0, 2)
        }));
    }

    if (!reportText) {
        return { ascendantNumber, planets: planetsList };
    }

    // Parse Ascendant/Lagna Sign or Number
    const ascSignRegex = /(?:ascendant|lagna)(?:\s+is|\s*[:\-=])\s*([a-z0-9]+)/i;
    const signMatch = reportText.match(ascSignRegex);
    if (signMatch && signMatch[1]) {
        const val = signMatch[1].trim();
        const capVal = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
        if (signNumbers[capVal]) {
            ascendantNumber = signNumbers[capVal];
        } else if (!isNaN(val) && Number(val) >= 1 && Number(val) <= 12) {
            ascendantNumber = Number(val);
        }
    }

    // Parse Planets in Houses
    const planetNames = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const parsedPlanets = {};

    planetNames.forEach(planet => {
        const pLower = planet.toLowerCase();
        
        // Pattern A: "Sun in 4th house"
        const regexA = new RegExp(`${pLower}\\s+in\\s+(?:the\\s+)?(\\d+)(?:st|nd|rd|th)?\\s+house`, 'i');
        const matchA = reportText.match(regexA);
        if (matchA && matchA[1]) {
            parsedPlanets[planet] = Number(matchA[1]);
            return;
        }

        // Pattern B: "Sun: 4" or "Sun is in 4"
        const regexB = new RegExp(`${pLower}\\s*(?:[:\\-=]|\\s+is(?:\\s+in)?)\\s*(\\d+)(?:st|nd|rd|th)?(?:\\s+house)?`, 'i');
        const matchB = reportText.match(regexB);
        if (matchB && matchB[1]) {
            parsedPlanets[planet] = Number(matchB[1]);
            return;
        }

        // Pattern C: Markdown tables "| Sun | 4 |"
        const regexC = new RegExp(`\\|\\s*(?:\\*\\*)?${pLower}(?:\\*\\*)?\\s*\\|\\s*(?:\\*\\*)?(\\d+)(?:st|nd|rd|th)?\\s*(?:\\*\\*)?\\s*\\|`, 'i');
        const matchC = reportText.match(regexC);
        if (matchC && matchC[1]) {
            parsedPlanets[planet] = Number(matchC[1]);
        }
    });

    const parsedKeys = Object.keys(parsedPlanets);
    if (parsedKeys.length > 0) {
        const newPlanetsList = parsedKeys.map(name => ({
            name,
            house: parsedPlanets[name],
            abbreviation: name.substring(0, 2)
        }));

        planetNames.forEach(planet => {
            if (!parsedPlanets[planet]) {
                const defaultP = planetsList.find(p => p.name === planet);
                if (defaultP) {
                    newPlanetsList.push(defaultP);
                }
            }
        });
        
        return { ascendantNumber, planets: newPlanetsList };
    }

    return { ascendantNumber, planets: planetsList };
};

const planetThemes = {
    Sun: {
        title: "Soul & Authority",
        icon: "☀️",
        houses: {
            1: "Radiant self-expression, strong vital energy, and natural leadership capabilities.",
            2: "Focus on family values, financial security, and powerful, authoritative speech.",
            3: "Courageous expression, dynamic willpower, and high determination in pursuits.",
            4: "Deep connection to roots, happiness through home, and a search for inner peace.",
            5: "Creative intelligence, natural teaching abilities, and speculative foresight.",
            6: "Victory over adversity, highly service-oriented intellect, and robust vitality.",
            7: "Public visibility, influential partnerships, and leadership in collaborations.",
            8: "Interest in hidden sciences, deep personal transformations, and longevity.",
            9: "Philosophical mindset, higher learning, and a natural affinity for spiritual truths.",
            10: "High professional authority, career prominence, and impactful social status.",
            11: "Expansive network circles, financial gains, and successful fulfillment of goals.",
            12: "Spiritual introspection, solitary meditation, and connection to foreign lands."
        }
    },
    Moon: {
        title: "Mind & Emotions",
        icon: "🌙",
        houses: {
            1: "Strong emotional sensitivity, intuitive nature, and a highly empathetic outlook.",
            2: "Fluctuating financial cycles, deep family ties, and imaginative speech.",
            3: "Artistic communication, restless intellect, and close sibling bonds.",
            4: "Deep emotional attachment to home, nurturing disposition, and mental peace.",
            5: "Romantic outlook, love for children, and an active, creative imagination.",
            6: "Sensitive digestive health, emotional devotion to daily work, and service.",
            7: "Dynamic partnership dynamics, desire for public connection, and emotional union.",
            8: "High intuitive psychic abilities, deep emotional secrets, and research capacity.",
            9: "Devotional spirit, interest in mythology, and foreign travels.",
            10: "Fluctuating but popular career status, public recognition, and nurturing leadership.",
            11: "Social popularity, supportive friendships, and emotional fulfillment of desires.",
            12: "Rich subconscious dreamscapes, spiritual isolation, and high empathy."
        }
    },
    Mars: {
        title: "Drive & Energy",
        icon: "🔥",
        houses: {
            1: "Courageous drive, highly competitive nature, and strong physical vitality.",
            2: "Passionate focus on wealth, assertive speech, and family protectiveness.",
            3: "Bold communication style, highly motivated sibling relations, and manual skills.",
            4: "Protective of home environment, high domestic energy, and real estate focus.",
            5: "Highly passionate creativity, competitive spirit in sports, and direct parenting.",
            6: "Fierce victory over competitors, great physical endurance, and active problem-solving.",
            7: "Energetic and passionate partnerships, direct confrontation style, and drive.",
            8: "Strong investigative drive, mystical experiences, and high resilience.",
            9: "Passionate philosophical beliefs, adventurous travel, and spiritual warrior attitude.",
            10: "Ambitious career drive, high executive status, and pioneering actions.",
            11: "Action-oriented networking, competitive friendships, and aggressive pursuit of gains.",
            12: "Subconscious processing, spiritual retreat, and energy spent on foreign ventures."
        }
    },
    Mercury: {
        title: "Intellect & Speech",
        icon: "✍️",
        houses: {
            1: "Quick-witted intellect, highly communicative nature, and versatile outlook.",
            2: "Analytical financial skills, mathematical ability, and witty speech.",
            3: "Excellent writing skills, logical deduction, and active daily coordination.",
            4: "Active intellectual discussion at home, love for reading, and mental agility.",
            5: "Speculative intellect, witty humor, and interest in academic tutoring.",
            6: "Detail-oriented work ethic, analytical healing, and logical problem-solving.",
            7: "Intellectual partnership bonding, clear diplomacy, and business contracts.",
            8: "Investigative research capacity, occult study, and secret communication.",
            9: "Higher academic learning, interest in scriptures, and philosophical writing.",
            10: "Versatile professional skills, communication-based career, and public speaking.",
            11: "Diverse social network, networking capability, and sharing ideas.",
            12: "Imaginative intuition, private diary writing, and studies of hidden realms."
        }
    },
    Jupiter: {
        title: "Wisdom & Grace",
        icon: "🕉️",
        houses: {
            1: "Noble and optimistic personality, spiritual wisdom, and physical protection.",
            2: "Abundant wealth, wise counseling, and sweet, virtuous speech.",
            3: "Optimistic communication, supportive siblings, and literary success.",
            4: "Spiritual happiness at home, comfortable real estate, and parental blessings.",
            5: "Exceptional wisdom, pious past karma (poorvapunya), and academic success.",
            6: "Victory over illness through wisdom, service to humanity, and peaceful daily life.",
            7: "Blessed spouse, fruitful business alliances, and global relations.",
            8: "Occult mastery, sudden spiritual revelations, and inheritance gains.",
            9: "Ultimate spiritual wisdom, global travels, and highly ethical lifestyle.",
            10: "Noble professional status, wise leadership, and social benevolence.",
            11: "Massive financial gains, virtuous friendships, and ease of desire fulfillment.",
            12: "Ultimate spiritual liberation (Moksha), charity, and peaceful inner retreats."
        }
    },
    Venus: {
        title: "Love & Art",
        icon: "💖",
        houses: {
            1: "Attractive and charming personality, artistic senses, and luxurious tastes.",
            2: "Financial prosperity, sweet, musical voice, and love for rich food.",
            3: "Artistic writing, beautiful hands, and loving sibling ties.",
            4: "Beautiful home environment, love for luxury cars, and maternal joy.",
            5: "Exceptional artistic talents, romantic relationships, and creative hobbies.",
            6: "Love for service, artistic healing methods, and smooth daily tasks.",
            7: "Highly loving marriage partner, aesthetic business, and public charm.",
            8: "Sudden financial windfalls, interest in occult secrets, and safe transformations.",
            9: "Love for culture and pilgrimage, spiritual art, and ethical devotion.",
            10: "Creative and artistic profession, popular career, and design leadership.",
            11: "Rich social circle, gains from female friends, and easy luxury gains.",
            12: "Luxurious comfort in sleep, spiritual surrender, and artistic isolation."
        }
    },
    Saturn: {
        title: "Discipline & Karma",
        icon: "🪐",
        houses: {
            1: "Highly disciplined personality, serious outlook, and early life struggles.",
            2: "Slow but steady wealth accumulation, conservative family values, and structured speech.",
            3: "Extreme determination, practical skills, and responsible sibling duties.",
            4: "Strict home discipline, duty towards mother, and delayed real estate assets.",
            5: "Highly structured intellect, serious parenting, and delayed but solid education.",
            6: "Unyielding service, control over long-term ailments, and high labor capacity.",
            7: "Late or mature marriage, dutiful business alliances, and public responsibility.",
            8: "Long life, chronic occult research, and highly transformational gains.",
            9: "Practical and orthodox spiritual values, delayed travel, and ethical duties.",
            10: "Dutiful career progression, public service, and high administrative responsibility.",
            11: "Few but highly loyal friendships, delayed wealth gains, and structured goals.",
            12: "Solitude in spiritual retreats, focus on charity, and subduing expenses."
        }
    },
    Rahu: {
        title: "Desire & Innovation",
        icon: "🌪️",
        houses: {
            1: "Unorthodox personality, intense self-focus, and desire for worldly success.",
            2: "Intense desire for wealth, unusual family dynamics, and unconventional speech.",
            3: "Highly courageous communication, tech-savvy skills, and media success.",
            4: "Desire for foreign homes, non-traditional roots, and deep subconscious drives.",
            5: "Unconventional education, love for speculative arts, and brilliant creativity.",
            6: "Conquering enemies through clever strategies, interest in advanced healing.",
            7: "Unusual partnership choices, unique business fields, and global outreach.",
            8: "Occult obsession, sudden extreme transformations, and secret gains.",
            9: "Unorthodox spiritual practices, international travel, and questioning of dogma.",
            10: "Highly ambitious career goals, revolutionary leadership, and public influence.",
            11: "Large, diverse networks, multiple sources of gains, and technological goals.",
            12: "Foreign settlement, deep interest in dream realms, and heavy spiritual spend."
        }
    },
    Ketu: {
        title: "Detachment & Moksha",
        icon: "☄️",
        houses: {
            1: "Deeply introspective, detached self-image, and natural spiritual aura.",
            2: "Detachment from family wealth, minimalist voice, and simple lifestyle.",
            3: "Highly intuitive skills, detached sibling relations, and silent courage.",
            4: "Detachment from worldly home attachments, seeking internal sanctuary.",
            5: "Brilliant abstract intelligence, spiritual learning, and detached parenting.",
            6: "No fear of enemies, natural immunity, and detached service mindset.",
            7: "Detached partnership dynamics, seeking spiritual union, and non-attachment.",
            8: "Deep psychic intuition, natural occult healing, and ease of spiritual death.",
            9: "High spiritual knowledge, detachment from organized religion, and inner guru connection.",
            10: "Detachment from corporate power, seeking career with spiritual meaning, and quiet work.",
            11: "Minimalist social networks, indifference to material gains, and simple wishes.",
            12: "Highest potential for spiritual liberation (Moksha), quiet solitude, and divine union."
        }
    }
};

export default function AIChatPage() {
    const { currentUser, currentKundli } = useKundliStore();
    const [selectedTab, setSelectedTab] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    
    // API Fetch states
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [reportContent, setReportContent] = useState("");
    const [reportError, setReportError] = useState("");
    const [copied, setCopied] = useState(false);
    
    const reportRef = useRef(null);

    // Format utility for response
    const parseBold = (content) => {
        const parts = content.split(/\*\*([^*]+)\*\*/g);
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return <strong key={i} className="font-semibold text-gray-950">{part}</strong>;
            }
            return part;
        });
    };

    // Format camelCase or snake_case keys into readable titles
    const formatKeyLabel = (key) => {
        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase())
            .trim();
    };

    // Robust JSON Parser that supports Markdown and bracket extracts
    const getParsedContent = (text) => {
        if (!text) return { type: "text", data: "" };
        const trimmed = text.trim();
        
        // 1. Check if complete raw JSON
        try {
            const parsed = JSON.parse(trimmed);
            if (typeof parsed === "object" && parsed !== null) {
                return { type: "json", data: parsed };
            }
        } catch (e) {}

        // 2. Extract JSON inside ```json ... ``` markdown blocks
        const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
        const match = trimmed.match(jsonRegex);
        if (match && match[1]) {
            try {
                const parsed = JSON.parse(match[1].trim());
                if (typeof parsed === "object" && parsed !== null) {
                    return { type: "json", data: parsed };
                }
            } catch (e) {}
        }

        // 3. Extract JSON using first '{' and last '}' brackets
        const startBracketIdx = trimmed.indexOf("{");
        const endBracketIdx = trimmed.lastIndexOf("}");
        if (startBracketIdx !== -1 && endBracketIdx !== -1 && endBracketIdx > startBracketIdx) {
            try {
                const candidate = trimmed.substring(startBracketIdx, endBracketIdx + 1);
                const parsed = JSON.parse(candidate);
                if (typeof parsed === "object" && parsed !== null) {
                    return { type: "json", data: parsed };
                }
            } catch (e) {}
        }

        return { type: "text", data: text };
    };

    // Beautiful dynamic key-value grid card layout
    const renderJSONPretty = (data) => {
        if (!data || typeof data !== "object") return null;

        // If it's an array, render list of items
        if (Array.isArray(data)) {
            return (
                <div className="space-y-4">
                    {data.map((item, idx) => (
                        <div key={idx} className="border border-yellow-100/60 rounded-3xl p-4 bg-yellow-50/10 shadow-sm">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-600 font-mono mb-2 block">
                                Item #{idx + 1}
                            </span>
                            {typeof item === "object" ? renderJSONPretty(item) : (
                                <p className="text-[13px] text-gray-700 leading-relaxed font-mono">{String(item)}</p>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(data).map(([key, value]) => {
                    if (key.startsWith("_") || value === undefined || value === null) return null;

                    if (typeof value === "object") {
                        return (
                            <div key={key} className="col-span-full border border-yellow-100/50 rounded-3xl p-5 bg-yellow-50/10 shadow-inner">
                                <h5 className="text-xs uppercase tracking-wide text-yellow-600 font-bold font-mono mb-4 border-b border-yellow-100 pb-1.5">
                                    {formatKeyLabel(key)}
                                </h5>
                                {renderJSONPretty(value)}
                            </div>
                        );
                    }

                    return (
                        <div key={key} className="flex flex-col p-4 bg-yellow-50/15 border border-yellow-100/50 rounded-2xl shadow-sm transition-all hover:scale-[1.005] hover:shadow-md">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-yellow-600 font-mono">
                                {formatKeyLabel(key)}
                            </span>
                            <span className="text-sm font-semibold text-gray-900 mt-1 font-mono leading-relaxed whitespace-pre-wrap">
                                {String(value)}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Declare headers list for the active table
    let tableHeaders = [];

    const renderFormattedText = (text) => {
        if (!text) return null;
        const lines = text.split("\n");
        return lines.map((line, idx) => {
            let trimmed = line.trim();
            if (!trimmed) {
                tableHeaders = []; // Clear headers on table breaks
                return <div key={idx} className="h-2" />;
            }
            
            // 1. Clean markdown table divider lines (e.g., |---|---| or |:---|:---|) with a single straight line
            if (trimmed.startsWith("|") && trimmed.includes("-")) {
                const clean = trimmed.replace(/[|:\-\s]/g, "");
                if (clean.length === 0) {
                    return <hr key={idx} className="my-4 border-yellow-100/80" />;
                }
            }

            // 2. Format markdown table rows into clean, structured key-value grids dynamically matching the columns count
            if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
                const cells = trimmed.split("|").map(c => c.trim()).slice(1, -1); // Trim off first and last empty segments
                if (cells.length > 0) {
                    const colCount = cells.length;

                    // Check if it's the header row
                    const isHeader = trimmed.toLowerCase().includes("planet") || trimmed.toLowerCase().includes("core themes") || trimmed.toLowerCase().includes("value") || trimmed.toLowerCase().includes("how they show up") || trimmed.toLowerCase().includes("themes");

                    if (isHeader) {
                        tableHeaders = cells; // Accumulate table header labels

                        // If wide table (5+ columns, e.g. Planet Details), do not print a horizontal grid header
                        if (colCount >= 5) {
                            return null;
                        }

                        const gridColsClass = 
                            colCount === 1 ? "grid-cols-1" :
                            colCount === 2 ? "grid-cols-2" :
                            colCount === 3 ? "grid-cols-3" :
                            colCount === 4 ? "grid-cols-4" : "grid-cols-6";

                        return (
                            <div key={idx} className={`grid ${gridColsClass} gap-4 py-3 px-5 bg-yellow-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-t-2xl mt-4 shadow-sm`}>
                                {cells.map((cell, cidx) => (
                                    <div key={cidx}>
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    // IF WIDE TABLE (5+ columns): PIVOT AND RENDER VERTICALLY TOP-TO-BOTTOM!
                    if (colCount >= 5) {
                        const planetName = cells[0].replace(/\*\*/g, ""); // Clean markdown bolding
                        
                        return (
                            <div key={idx} className="border border-yellow-100 bg-white/90 rounded-3xl p-5 mb-5 shadow-sm transition-all hover:scale-[1.005] hover:shadow-md border-t-4 border-t-yellow-400">
                                {/* Pivot Card Header */}
                                <div className="flex justify-between items-center border-b border-yellow-50 pb-3 mb-4">
                                    <h4 className="text-xs font-bold text-gray-900 font-mono flex items-center gap-1.5 uppercase tracking-wide">
                                        <span className="text-yellow-500">🪐</span> {planetName} Details
                                    </h4>
                                    <span className="text-[8px] uppercase font-bold tracking-wider text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full font-mono">
                                        Vedic Alignment
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {cells.slice(1).map((cell, cidx) => {
                                        // Retrieve the matching label from tableHeaders
                                        const headerLabel = tableHeaders[cidx + 1] || `Detail #${cidx + 1}`;
                                        const isLong = cell.length > 50 || headerLabel.toLowerCase().includes("how the planet") || headerLabel.toLowerCase().includes("express");

                                        if (isLong) {
                                            return (
                                                <div key={cidx} className="flex flex-col pt-2 border-t border-yellow-50/40">
                                                    <span className="text-[9px] uppercase font-bold tracking-wider text-yellow-600 font-mono mb-1.5">
                                                        {headerLabel}
                                                    </span>
                                                    <span className="text-[12px] text-gray-700 leading-relaxed font-mono whitespace-pre-wrap">
                                                        {parseBold(cell)}
                                                    </span>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={cidx} className="flex items-center justify-between py-1.5 border-b border-yellow-50/40 font-mono text-[12px]">
                                                <span className="font-bold text-yellow-800 uppercase tracking-wider text-[9px]">{headerLabel}</span>
                                                <span className="text-gray-800 font-semibold">{parseBold(cell)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    // Otherwise, render a classic horizontal grid row
                    const gridColsClass = 
                        colCount === 1 ? "grid-cols-1" :
                        colCount === 2 ? "grid-cols-2" :
                        colCount === 3 ? "grid-cols-3" :
                        colCount === 4 ? "grid-cols-4" : "grid-cols-6";

                    return (
                        <div key={idx} className={`grid ${gridColsClass} gap-4 py-3 px-5 border-b border-yellow-50 bg-white/70 font-mono text-[11px] leading-relaxed transition-all hover:bg-yellow-50/15`}>
                            {cells.map((cell, cidx) => (
                                <div key={cidx} className={cidx === 0 ? "font-bold text-gray-900" : "text-gray-600"}>
                                    {parseBold(cell)}
                                </div>
                            ))}
                        </div>
                    );
                }
            }
            
            if (trimmed.startsWith("###")) {
                return <h4 key={idx} className="text-sm font-semibold text-gray-900 mt-5 mb-2.5 font-mono">{trimmed.replace(/^###\s*/, "")}</h4>;
            }
            if (trimmed.startsWith("##")) {
                return <h3 key={idx} className="text-base font-bold text-gray-950 mt-6 mb-3 font-mono border-b border-yellow-100 pb-1">{trimmed.replace(/^##\s*/, "")}</h3>;
            }
            if (trimmed.startsWith("#")) {
                return <h2 key={idx} className="text-lg font-bold text-gray-950 mt-6 mb-3 font-mono">{trimmed.replace(/^#\s*/, "")}</h2>;
            }
            
            if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
                const content = trimmed.replace(/^[-*]\s*/, "");
                
                // Beautifully render standard metadata lists like: "- **Sign:** **Scorpio** (Vrishchika)"
                const metaRegex = /^\*\*([^*]+):\*\*\s*([\s\S]*)/;
                const metaMatch = content.match(metaRegex);
                if (metaMatch) {
                    const key = metaMatch[1].trim();
                    const value = metaMatch[2].trim();
                    return (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 px-5 border border-yellow-100/40 bg-yellow-50/10 rounded-2xl mb-2 font-mono text-[11px] transition-all hover:scale-[1.005] hover:shadow-sm">
                            <span className="font-bold text-yellow-800 uppercase tracking-wider text-[9px]">{key}</span>
                            <span className="text-gray-800 mt-1 sm:mt-0 font-semibold">{parseBold(value)}</span>
                        </div>
                    );
                }

                return (
                    <li key={idx} className="ml-4 list-disc text-[12px] text-gray-700 leading-relaxed mb-1.5 font-mono">
                        {parseBold(content)}
                    </li>
                );
            }
            
            return (
                <p key={idx} className="text-[12px] text-gray-700 leading-relaxed mb-3 font-mono">
                    {parseBold(trimmed)}
                </p>
            );
        });
    };

    const handleTabClick = async (tab) => {
        setSelectedTab(tab);
        setIsLoadingReport(true);
        setReportContent("");
        setReportError("");

        // Scroll to report view
        setTimeout(() => {
            reportRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);

        let astrologyUserId = localStorage.getItem("astrology_user_id");
        if (!astrologyUserId && currentUser && currentUser.astrologyUserId) {
            astrologyUserId = currentUser.astrologyUserId;
        }

        if (!astrologyUserId) {
            setIsLoadingReport(false);
            setReportError("No chart session found. Please generate a Kundli chart first using the generator on the Home page.");
            return;
        }

        try {
            const res = await kundliAPI.chatWithAI(tab.prompt, astrologyUserId);
            const botReply = res.data?.reply || res.data?.message || res.reply || res.message;
            if (botReply) {
                setReportContent(botReply);
            } else {
                throw new Error("Could not parse astrology report response");
            }
        } catch (err) {
            console.error("Tab report error:", err);
            setReportError("The cosmic pathways are currently saturated. Let us align our energies and try clicking this tab again.");
        } finally {
            setIsLoadingReport(false);
        }
    };

    const handleCopy = () => {
        if (!reportContent) return;
        navigator.clipboard.writeText(reportContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    // Filter and search tabs
    const filteredTabs = ASTRO_TABS.filter((tab) => {
        const matchesCategory = activeCategory === "all" || tab.category === activeCategory;
        const matchesSearch = tab.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              tab.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (<div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-[85vh]">
      <MovingGradient />
      
      <div className="w-full max-w-4xl mx-auto py-6 sm:py-8 z-10 px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
            Vedic AI Hub & Chat
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-lg mx-auto">
            Interact with our spiritual intelligence in real-time or request advanced Vedic calculations using the tabs dashboard below.
          </p>
        </div>

        {/* Widescreen Chatbot */}
        <div className="w-full mb-10">
          <AIChatBot />
        </div>

        {/* Relationship Matchmaking Banner */}
        <div className="w-full mb-10 bg-gradient-to-r from-pink-500/10 via-white/50 to-purple-500/10 border border-pink-100 rounded-3xl p-6 shadow-[0_8px_30px_rgba(255,240,245,0.2)] backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👩‍❤️‍👨</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight font-mono">
                Looking for Relationship Compatibility?
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5 font-mono">
                Generate an authentic 36-point Guna Milan compatibility report with live planetary data & AI chat guides.
              </p>
            </div>
          </div>
          <Link href="/match-making" className="shrink-0">
            <button className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-[11px] px-5 py-2.5 shadow transition-transform active:scale-95 flex items-center gap-1.5 font-mono">
              <span>Try Matchmaking</span>
              <span>→</span>
            </button>
          </Link>
        </div>

        {/* Astrological Tabs Container */}
        <div className="w-full bg-white/70 backdrop-blur-md border border-yellow-100 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
          <div className="border-b border-gray-100 pb-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight font-mono">
              Vedic Analysis Dashboard
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Select any of the 23 premium calculations below to fetch dynamic charts and details.
            </p>
          </div>

          {/* Search and Category Filter panel */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input 
                type="text"
                placeholder="Search 23 calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-yellow-100/80 px-3 py-2.5 pl-10 text-xs bg-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              />
              <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-400" />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all ${
                      activeCategory === cat.id
                        ? "bg-yellow-400 text-white shadow-sm"
                        : "bg-white/80 text-gray-600 border border-yellow-50 hover:bg-yellow-50/50"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tabs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
            {filteredTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-md ${
                  selectedTab?.id === tab.id
                    ? "bg-gradient-to-r from-yellow-50 to-yellow-100/60 border-yellow-400 shadow-sm"
                    : "bg-white/80 border-gray-100/80 hover:border-yellow-200/60"
                }`}
              >
                <span className="text-[11px] font-semibold text-gray-800 leading-tight font-mono">
                  {tab.label}
                </span>
                <span className="text-[8px] text-gray-400 mt-1 uppercase tracking-wider font-mono">
                  {tab.category}
                </span>
              </button>
            ))}
            {filteredTabs.length === 0 && (
              <div className="col-span-full py-8 text-center text-xs text-gray-500 font-mono">
                No matching Vedic calculators found. Try a different search!
              </div>
            )}
          </div>

          {/* Dynamic Report Viewer */}
          <div ref={reportRef} className="scroll-mt-6">
            {selectedTab && (
              <div className="rounded-3xl border border-yellow-100/60 bg-white/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                {/* Visual Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5 mb-6">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-yellow-500 font-mono">
                      Vedic Report
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 font-mono mt-0.5">
                      {selectedTab.label}
                    </h3>
                  </div>

                  {/* Actions buttons */}
                  {reportContent && !isLoadingReport && (
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={handleCopy}
                        title="Copy report"
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50"
                      >
                        {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={handlePrint}
                        title="Print report"
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50"
                      >
                        <Printer className="h-3 w-3" />
                        Print
                      </button>
                    </div>
                  )}
                </div>

                {/* Report Content states */}
                {isLoadingReport && (
                  <div className="flex flex-col justify-center items-center py-16 text-center">
                    <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-4" />
                    <p className="text-xs text-gray-600 font-mono">
                      Consulting planetary coordinates and ancient shlokas...
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">
                      Please wait a moment for the AI response to form.
                    </p>
                  </div>
                )}

                {reportError && !isLoadingReport && (
                  <div className="border border-red-100 rounded-2xl bg-red-50/50 p-6 text-center text-xs text-red-700 font-mono">
                    ⚠️ {reportError}
                  </div>
                )}

                {reportContent && !isLoadingReport && (
                  <div className="space-y-6">
                    {selectedTab.id === "chart_image" && (
                      (() => {
                        const svgRegex = /<svg[\s\S]*?<\/svg>/i;
                        const match = reportContent.match(svgRegex);
                        const { ascendantNumber, planets } = parseDynamicChartData(reportContent, currentKundli);

                        return (
                          <div className="w-full flex flex-col items-center">
                            {match && match[0] ? (
                              <div className="flex flex-col items-center justify-center p-2 mb-6 w-full">
                                <h4 className="text-[10px] uppercase tracking-wider text-yellow-600 font-bold font-mono mb-4">
                                  Interactive Vedic Birth Chart (D1)
                                </h4>
                                <D3SvgViewer svgString={match[0]} />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-6 bg-yellow-50/20 border border-yellow-100 rounded-3xl mb-6 max-w-[340px] sm:max-w-[420px] mx-auto shadow-inner w-full">
                                <h4 className="text-[10px] uppercase tracking-wider text-yellow-600 font-bold font-mono mb-4">
                                  Dynamic Birth Chart (D1)
                                </h4>
                                <NorthIndianChart 
                                  ascendantNumber={ascendantNumber}
                                  planets={planets}
                                />
                              </div>
                            )}

                            {/* Premium Dynamic Planetary Briefings Card HUD */}
                            {planets && planets.length > 0 && (
                              <div className="w-full mt-8 border-t border-yellow-100/50 dark:border-neutral-800/80 pt-6">
                                <h4 className="text-[11px] font-bold text-gray-900 dark:text-neutral-200 font-mono flex items-center gap-1.5 uppercase tracking-wider mb-4">
                                  🌌 Live Planetary Placements Briefing
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {planets.map((p) => {
                                    const theme = planetThemes[p.name];
                                    if (!theme) return null;
                                    const houseNum = p.house;
                                    const briefing = theme.houses[houseNum] || "Spiritual influence on life's path.";
                                    const suffix = 
                                      houseNum === 1 ? "st" :
                                      houseNum === 2 ? "nd" :
                                      houseNum === 3 ? "rd" : "th";
                                    
                                    return (
                                      <div key={p.name} className="flex flex-col p-4 bg-yellow-50/10 dark:bg-neutral-900/40 border border-yellow-100/40 dark:border-neutral-800/80 rounded-2xl shadow-sm hover:scale-[1.005] hover:shadow-md transition-all">
                                        <div className="flex justify-between items-center mb-1.5">
                                          <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                                            {theme.icon} {p.name}
                                          </span>
                                          <span className="text-[9px] font-bold font-mono text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 px-2 py-0.5 rounded-full uppercase">
                                            {houseNum}{suffix} House
                                          </span>
                                        </div>
                                        <span className="text-[9px] uppercase font-semibold text-gray-400 font-mono tracking-wider">
                                          {theme.title}
                                        </span>
                                        <p className="text-[11px] text-gray-600 dark:text-neutral-300 mt-2.5 font-mono leading-relaxed">
                                          {briefing}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()
                    )}
                    <div className="prose max-w-none text-gray-800 text-xs">
                      {(() => {
                        const parsed = getParsedContent(reportContent);
                        if (parsed.type === "json") {
                          return renderJSONPretty(parsed.data);
                        }
                        return renderFormattedText(parsed.data);
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);
}
