"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AIChatBox from "@/components/Chatbot/AIChatBox";
import { motion, AnimatePresence } from "framer-motion";
import Orb from "../ui/bits/orb";
import { useKundliStore } from "@/lib/store";
import { kundliAPI } from "@/lib/api";
import Link from "next/link";

function FormattedMessage({ text }) {
    if (!text) return null;
    const lines = text.split("\n");
    let tableHeaders = [];
    
    const parseBold = (content) => {
        const parts = content.split(/\*\*([^*]+)\*\*/g);
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return <strong key={i} className="font-extrabold text-amber-700 dark:text-amber-400">{part}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="space-y-1.5 font-mono text-[11px] sm:text-[12px] leading-relaxed">
            {lines.map((line, idx) => {
                let trimmed = line.trim();
                if (!trimmed) {
                    tableHeaders = [];
                    return <div key={idx} className="h-1.5" />;
                }

                // Markdown Table Divider
                if (trimmed.startsWith("|") && trimmed.includes("-")) {
                    const clean = trimmed.replace(/[|:\-\s]/g, "");
                    if (clean.length === 0) {
                        return <hr key={idx} className="my-2 border-amber-100/50" />;
                    }
                }

                // Markdown Table Row
                if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
                    const cells = trimmed.split("|").map(c => c.trim()).slice(1, -1);
                    if (cells.length > 0) {
                        const colCount = cells.length;
                        const isHeader = trimmed.toLowerCase().includes("planet") || 
                                         trimmed.toLowerCase().includes("indicator") || 
                                         trimmed.toLowerCase().includes("issue") ||
                                         trimmed.toLowerCase().includes("antardasha") ||
                                         trimmed.toLowerCase().includes("transit") ||
                                         trimmed.toLowerCase().includes("theme");

                        if (isHeader) {
                            tableHeaders = cells;
                            if (colCount >= 5) {
                                return null;
                            }

                            const gridColsClass = 
                                colCount === 1 ? "grid-cols-1" :
                                colCount === 2 ? "grid-cols-2" :
                                colCount === 3 ? "grid-cols-3" :
                                colCount === 4 ? "grid-cols-4" : "grid-cols-6";

                            return (
                                <div key={idx} className={`grid ${gridColsClass} gap-2 py-2 px-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold uppercase tracking-wider rounded-t-xl mt-3 shadow-xs`}>
                                    {cells.map((cell, cidx) => (
                                        <div key={cidx} className="truncate">{cell}</div>
                                    ))}
                                </div>
                            );
                        }

                        // Wide Table Pivot (5+ columns)
                        if (colCount >= 5) {
                            const planetName = cells[0].replace(/\*\*/g, "");
                            return (
                                <div key={idx} className="border border-amber-100/85 bg-amber-50/5 rounded-2xl p-4 my-2.5 shadow-xs border-t-2 border-t-amber-500 font-mono">
                                    <div className="flex justify-between items-center border-b border-amber-100 pb-1.5 mb-2.5">
                                        <h4 className="text-[11px] font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                                            <span>🪐</span> {planetName} Details
                                        </h4>
                                        <span className="text-[8px] uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                            Vedic
                                        </span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {cells.slice(1).map((cell, cidx) => {
                                            const headerLabel = tableHeaders[cidx + 1] || `Detail #${cidx + 1}`;
                                            const isLong = cell.length > 40;
                                            if (isLong) {
                                                return (
                                                    <div key={cidx} className="flex flex-col pt-1.5 border-t border-amber-50/40">
                                                        <span className="text-[8px] uppercase font-bold tracking-wider text-amber-600 mb-1">
                                                            {headerLabel}
                                                        </span>
                                                        <span className="text-[11px] text-gray-700 leading-relaxed">
                                                            {parseBold(cell)}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={cidx} className="flex items-center justify-between py-1 border-b border-amber-50/30 text-[11px]">
                                                    <span className="font-bold text-amber-700 uppercase tracking-wider text-[8px]">{headerLabel}</span>
                                                    <span className="text-gray-800 font-semibold">{parseBold(cell)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }

                        // Normal Table Row
                        const gridColsClass = 
                            colCount === 1 ? "grid-cols-1" :
                            colCount === 2 ? "grid-cols-2" :
                            colCount === 3 ? "grid-cols-3" :
                            colCount === 4 ? "grid-cols-4" : "grid-cols-6";

                        return (
                            <div key={idx} className={`grid ${gridColsClass} gap-2 py-2 px-3 border-b border-amber-50 bg-amber-50/10 text-[11px] leading-relaxed transition-all hover:bg-amber-100/10`}>
                                {cells.map((cell, cidx) => (
                                    <div key={cidx} className={cidx === 0 ? "font-bold text-gray-900" : "text-gray-600"}>
                                        {parseBold(cell)}
                                    </div>
                                ))}
                            </div>
                        );
                    }
                }

                // Headings
                if (trimmed.startsWith("###")) {
                    return <h4 key={idx} className="text-xs font-bold text-amber-900 mt-3.5 mb-1 uppercase tracking-wider">{trimmed.replace(/^###\s*/, "")}</h4>;
                }
                if (trimmed.startsWith("##")) {
                    return <h3 key={idx} className="text-xs sm:text-sm font-bold text-amber-950 mt-4.5 mb-1.5 border-b border-amber-100 pb-1 uppercase tracking-wide">{trimmed.replace(/^##\s*/, "")}</h3>;
                }
                if (trimmed.startsWith("#")) {
                    return <h2 key={idx} className="text-sm sm:text-base font-bold text-gray-900 mt-4.5 mb-1.5">{trimmed.replace(/^#\s*/, "")}</h2>;
                }

                // Blockquotes
                if (trimmed.startsWith(">")) {
                    return (
                        <div key={idx} className="pl-3 border-l-2 border-amber-400 bg-amber-50/30 p-2 rounded-r-xl my-2 text-amber-800 text-[11px]">
                            {parseBold(trimmed.replace(/^>\s*/, ""))}
                        </div>
                    );
                }

                // Lists
                if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
                    const content = trimmed.replace(/^[-*]\s*/, "");
                    const metaRegex = /^\*\*([^*]+):\*\*\s*([\s\S]*)/;
                    const metaMatch = content.match(metaRegex);
                    if (metaMatch) {
                        const key = metaMatch[1].trim();
                        const value = metaMatch[2].trim();
                        return (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 px-3 border border-amber-100/40 bg-amber-50/5 rounded-xl mb-1.5 text-[11px] transition-all hover:bg-amber-50/15">
                                <span className="font-bold text-amber-700 uppercase tracking-wider text-[8px]">{key}</span>
                                <span className="text-gray-800 mt-0.5 sm:mt-0 font-semibold">{parseBold(value)}</span>
                            </div>
                        );
                    }
                    return (
                        <li key={idx} className="ml-3 list-disc text-[11px] text-gray-700 leading-relaxed mb-1">
                            {parseBold(content)}
                        </li>
                    );
                }

                return (
                    <p key={idx} className="text-[11px] text-gray-700 leading-relaxed mb-1.5">
                        {parseBold(trimmed)}
                    </p>
                );
            })}
        </div>
    );
}

export default function AIChatBot({ onSend }) {
    const { currentUser } = useKundliStore();
    const [messages, setMessages] = useState([]);
    const [started, setStarted] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [astrologyUserId, setAstrologyUserId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    useEffect(() => {
        let storedId = localStorage.getItem("astrology_user_id");
        if (!storedId && currentUser && currentUser.astrologyUserId) {
            storedId = currentUser.astrologyUserId;
            localStorage.setItem("astrology_user_id", storedId);
        }
        if (storedId) {
            setAstrologyUserId(storedId);
        }
    }, [currentUser]);

    const handleSend = async (text) => {
        if (!astrologyUserId) return;

        if (!started) setStarted(true);

        setMessages((prev) => [...prev, { role: "user", text }]);
        setIsThinking(true);

        onSend?.(text);

        try {
            const res = await kundliAPI.chatWithAI(text, astrologyUserId);
            const botReply = res.data?.reply || res.data?.message || res.reply || res.message || "I am connected, but I couldn't process the response. Let us align our energies and try again.";
            
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: botReply,
                },
            ]);
        } catch (err) {
            console.error("Failed to fetch AI reply:", err);
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "✨ The cosmic pathways are currently resetting. Please try asking your question again in a moment.",
                },
            ]);
        } finally {
            setIsThinking(false);
        }
    };

    const orbRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const handleHover = useCallback((state) => {
        setHovered(state);
        orbRef.current?.setHoverState?.(state);
    }, []);

    useEffect(() => {
        if (!orbRef.current) return;
        const intensity = hovered ? 1.2 : 0.5;
        orbRef.current.setIntensity?.(intensity);
    }, [hovered]);

    if (!astrologyUserId) {
        return (
            <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center rounded-3xl border border-yellow-100 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.05)] p-8 text-center h-[500px]">
                <div className="h-16 w-16 mb-6 rounded-2xl bg-yellow-50 flex items-center justify-center shadow-inner">
                    <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-lg font-mono font-semibold text-gray-900 mb-2">
                    Chart Session Required
                </h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                    Please generate a Kundli first so the AI can understand your personal chart details and planetary influences.
                </p>
                <Link href="/">
                    <button className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold text-xs px-6 py-3 shadow transition-transform active:scale-95">
                        Generate Kundli
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col rounded-3xl border border-gray-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.05)] overflow-hidden h-[600px] font-mono">
            {/* HEADER */}
            <div className="px-6 py-5 border-b border-gray-100 bg-white flex justify-between items-center">
                <div>
                    <h2 className="text-base font-semibold tracking-tight text-gray-900">
                        AI Astrology Guide
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        Dynamic Kundli-based guidance
                    </p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" title="Connected to Astrology Bot" />
            </div>

            {/* ORB + INTRO (fades on first message) */}
            <AnimatePresence>
                {!started && (
                    <motion.div 
                        initial={{ opacity: 0, y: 12 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.97, y: -8 }} 
                        transition={{ duration: 0.4, ease: "easeOut" }} 
                        className="flex flex-col items-center justify-center py-6 px-6 pointer-events-none"
                    >
                        <div className="relative h-28 w-28 flex items-center justify-center">
                            <Orb hoverIntensity={0.8} rotateOnHover hue={220} forceHoverState={hovered}/>
                        </div>

                        <p className="text-center text-[11px] mt-4 text-gray-600 leading-relaxed">
                            Welcome! I understand your charts. Ask me about your planetary positions, zodiac influences, or predictions.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CHAT MESSAGES */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
                <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 6 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0 }} 
                            transition={{ duration: 0.25 }} 
                            className={`w-fit max-w-[85%] px-4 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
                                msg.role === "user"
                                    ? "ml-auto bg-fuchsia-100 text-fuchsia-700 rounded-br-sm shadow-[0_1px_2px_rgba(240,230,255,0.5)]"
                                    : "mr-auto bg-gray-100 text-gray-800 rounded-bl-sm shadow-[0_1px_2px_rgba(245,245,245,0.5)]"
                            }`}
                        >
                            {msg.role === "ai" ? <FormattedMessage text={msg.text} /> : msg.text}
                        </motion.div>
                    ))}
                    {isThinking && (
                        <motion.div 
                            initial={{ opacity: 0, y: 6 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="mr-auto bg-gray-100 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-sm text-xs flex items-center gap-1.5 shadow-[0_1px_2px_rgba(245,245,245,0.5)]"
                        >
                            <span>Reading your chart</span>
                            <span className="flex gap-0.5">
                                <span className="h-1 w-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="h-1 w-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="h-1 w-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* CHATBOX */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <AIChatBox onSend={handleSend} placeholder="Ask about your planetary details..." disabled={isThinking} />
            </div>
        </div>
    );
}
