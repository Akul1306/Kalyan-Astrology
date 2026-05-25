"use client";
import * as React from "react";
export function useChat(initial) {
    const [messages, setMessages] = React.useState(initial || []);
    const send = (text) => {
        setMessages(prev => [...prev, { role: "user", content: text }]);
        setTimeout(() => setMessages(prev => [...prev, { role: "assistant", content: "Placeholder response." }]), 250);
    };
    return { messages, send };
}
