"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AIChatBox from "@/components/Chatbot/AIChatBox";
import { motion, AnimatePresence } from "framer-motion";
import Orb from "../ui/bits/orb";
import { useKundliStore } from "@/lib/store";
import { kundliAPI } from "@/lib/api";
import Link from "next/link";

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
                            {msg.text}
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
