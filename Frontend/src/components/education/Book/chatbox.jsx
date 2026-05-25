"use client";
import React, { useState } from "react";
const ChatBox = ({ onSend, placeholder = "What are special lagnas?" }) => {
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed)
            return;
        onSend(trimmed);
        setValue("");
    };
    return (<form onSubmit={handleSubmit} className="relative flex w-full items-center gap-3 rounded-2xl border border-white/20 bg-white/20 px-3 py-2 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
      <input className="w-full flex-1 bg-transparent px-2 py-3 text-[15px] text-gray-900 placeholder:text-gray-600 outline-none" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
      <button type="submit" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white shadow-md transition-transform hover:scale-[1.02] active:scale-95" aria-label="Send">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.4 20.6 21 12 3.4 3.4l3.2 7.2 7.2 1.4-7.2 1.4-3.2 7.2Z" fill="currentColor"/>
        </svg>
      </button>
    </form>);
};
export default ChatBox;
