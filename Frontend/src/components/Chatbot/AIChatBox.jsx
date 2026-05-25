"use client";
import React, { useState, useCallback } from "react";
const AIChatBox = ({ onSend, placeholder = "What are special lagnas?", disabled = false, isSending = false, className = "", }) => {
    const [value, setValue] = useState("");
    const [localSending, setLocalSending] = useState(false);
    const sending = disabled || isSending || localSending;
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (sending)
            return;
        const trimmed = value.trim();
        if (!trimmed)
            return;
        try {
            const maybePromise = onSend(trimmed);
            setLocalSending(true);
            await Promise.resolve(maybePromise);
            setValue("");
        }
        catch (err) {
            // Error handling - in production, show toast notification
            if (process.env.NODE_ENV === "development") {
                console.error("ChatBox onSend error:", err);
            }
        }
        finally {
            setLocalSending(false);
        }
    }, [value, onSend, sending]);
    return (<form onSubmit={handleSubmit} className={`relative flex w-full items-center gap-3 rounded-2xl border border-white/20 
      bg-white/20 px-3 py-2 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
      focus-within:border-white/40 focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.5)]
      transition-colors transition-shadow duration-200 ${className}`} aria-label="Astrology AI chat input">
      <input className="w-full flex-1 bg-transparent px-2 py-3 text-[15px] text-gray-900 placeholder:text-gray-600 outline-none" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} disabled={sending} aria-disabled={sending} aria-label="Type your question" autoComplete="off"/>

      <button type="submit" disabled={sending} className={`inline-flex h-11 w-11 items-center justify-center rounded-xl 
        bg-linear-to-r from-fuchsia-500 to-rose-400 text-white shadow-md
        transition-transform transition-shadow duration-200
        hover:scale-[1.03] active:scale-95 hover:shadow-lg
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100`} aria-label={sending ? "Sending..." : "Send"}>
        {sending ? (
        // subtle loader dot animation
        <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-bounce"/>
            <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce delay-100"/>
            <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce delay-200"/>
          </span>) : (<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.4 20.6 21 12 3.4 3.4l3.2 7.2 7.2 1.4-7.2 1.4-3.2 7.2Z" fill="currentColor"/>
          </svg>)}
      </button>
    </form>);
};
export default AIChatBox;
