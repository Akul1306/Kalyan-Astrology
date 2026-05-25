"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ChatBox from "./chatbox";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, ChevronDown, Sparkles, AlertCircle } from "lucide-react";
import remarkGfm from "remark-gfm";

// Lazy-load react-markdown for performance
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

const Chat = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialBookParam = searchParams.get("book");

    const [messages, setMessages] = useState([
        {
            id: "intro",
            role: "assistant",
            content: "Hi 👋 I'm your Vedic Assistant. Ask any question! 📚✨",
        }
    ]);

    const [libraryBooks, setLibraryBooks] = useState([]);
    const [ragSupportedBooks, setRagSupportedBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null); // null means "All Books"
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef(null);

    // Fetch library books and RAG supported books
    useEffect(() => {
        const loadBooksData = async () => {
            try {
                // Fetch our library books
                const libResponse = await fetch("/api/books");
                const libData = await libResponse.json();
                let libList = [];
                if (libData.status === "success" && libData.data?.books) {
                    libList = libData.data.books;
                    setLibraryBooks(libList);
                }

                // Fetch books indexed in the RAG service
                const ragResponse = await fetch("https://astrologyrag-production.up.railway.app/books");
                if (ragResponse.ok) {
                    const ragList = await ragResponse.json();
                    const ragTitles = ragList.map(b => b.book_title);
                    setRagSupportedBooks(ragTitles);
                }
            } catch (error) {
                console.error("Error loading books data:", error);
            }
        };

        loadBooksData();
    }, []);

    // Set initial book from URL parameter
    useEffect(() => {
        if (initialBookParam) {
            setSelectedBook(decodeURIComponent(initialBookParam));
        }
    }, [initialBookParam, libraryBooks]);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            setTimeout(() => {
                el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            }, 100);
        }
    }, [messages.length, isLoading]);

    const handleSend = async (newMessage) => {
        if (!newMessage.trim() || isLoading)
            return;

        const userMsgId = crypto.randomUUID();
        const assistantMsgId = crypto.randomUUID();

        // Add user message
        setMessages((prev) => [
            ...prev,
            { id: userMsgId, role: "user", content: newMessage }
        ]);

        setIsLoading(true);

        try {
            // Check if selected book is RAG indexed
            const isSupported = selectedBook ? ragSupportedBooks.some(
                title => title.toLowerCase().trim() === selectedBook.toLowerCase().trim()
            ) : false;

            // Make request to RAG Chat API
            const response = await fetch("https://astrologyrag-production.up.railway.app/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: newMessage,
                    book: selectedBook || null
                })
            });

            if (!response.ok) {
                throw new Error("RAG Server Error");
            }

            const data = await response.json();

            // Check if custom book selected was not indexed in RAG
            let warningText = "";
            if (selectedBook && !isSupported) {
                warningText = `\n\n> [!NOTE]\n> *"${selectedBook}"* is currently being indexed. I've queried our classical archives to answer your question in the meantime. ✨`;
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: assistantMsgId,
                    role: "assistant",
                    content: (data.reply || "I couldn't find a response in the archives.") + warningText,
                    sources: data.sources || []
                }
            ]);
        } catch (error) {
            console.error("RAG Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: assistantMsgId,
                    role: "assistant",
                    content: "⚠️ **System Offline:** Unable to contact the sacred RAG servers. Please check your connection or select another classical book.",
                    sources: []
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (<section className="relative mx-auto w-full bg-gradient-to-br from-orange-400 via-pink-500 to-indigo-600 p-[2px] shadow-[0_15px_50px_rgba(0,0,0,0.15)] overflow-hidden">
      {/* Glassmorphic Chat Container */}
      <div className="bg-white/90 backdrop-blur-3xl font-[Inter] text-gray-800 flex flex-col min-h-[85vh]">
        
        {/* Premium Chat Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2.5 rounded-2xl shadow-md text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 tracking-tight font-poppins">
                Astrological RAG Portal
              </h2>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase font-mono mt-0.5">
                Vedic AI Assistant
              </p>
            </div>
          </div>

          {/* Book Selector Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-80 flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 hover:border-gray-300 active:scale-98 transition-all duration-200 cursor-pointer font-poppins text-sm text-gray-700 font-semibold shadow-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <BookOpen className="h-4 w-4 text-orange-500 shrink-0" />
                <span className="truncate">{selectedBook || "Explore All Scriptures"}</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Options */}
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-full sm:w-80 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-30 overflow-hidden flex flex-col font-poppins"
                  >
                    <div className="p-2 border-b border-gray-50 bg-gray-50/50">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 px-3">
                        Choose Query Target
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto p-1.5 flex flex-col gap-1">
                      {/* Search All */}
                      <button
                        onClick={() => {
                          setSelectedBook(null);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          selectedBook === null
                            ? "bg-orange-50 text-orange-600 font-bold"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span>Search Across All Books</span>
                        <Sparkles className="h-3.5 w-3.5 opacity-60" />
                      </button>

                      {/* Dynamic library books */}
                      {libraryBooks.map((book) => {
                        const isSupported = ragSupportedBooks.some(
                          title => title.toLowerCase().trim() === book.title.toLowerCase().trim()
                        );
                        return (
                          <button
                            key={book._id || book.id}
                            onClick={() => {
                              setSelectedBook(book.title);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                              selectedBook === book.title
                                ? "bg-orange-50 text-orange-600 font-bold"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            <span className="truncate pr-2">{book.title}</span>
                            {isSupported ? (
                              <span className="shrink-0 text-[8px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">
                                RAG Active
                              </span>
                            ) : (
                              <span className="shrink-0 text-[8px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono">
                                Uploaded
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Messages Body */}
        <div ref={containerRef} className="flex-grow h-[60vh] overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white flex flex-col gap-6 scroll-smooth">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-5 shadow-xs border transition-all ${
                msg.role === "assistant"
                  ? "bg-white text-gray-800 border-gray-100/80 leading-relaxed shadow-xs"
                  : "bg-gradient-to-tr from-orange-500 via-pink-500 to-indigo-600 text-white font-medium shadow-md border-transparent"
              }`}>
                {/* Message Content */}
                <div className="text-[14px] leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-inherit">{children}</strong>,
                      em: ({ children }) => <em className="italic text-gray-600 dark:text-inherit">{children}</em>,
                      ul: ({ children }) => <ul className="list-disc ml-5 space-y-2 my-2">{children}</ul>,
                      li: ({ children }) => <li className="pl-1">{children}</li>,
                      p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                      blockquote: ({ children }) => (
                        <div className="flex gap-2 p-3 bg-amber-500/10 border-l-4 border-amber-500 text-gray-800 dark:text-inherit rounded-r-xl my-4 text-xs font-semibold leading-relaxed">
                          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>{children}</div>
                        </div>
                      )
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Citations & Sources (Assistant Only) */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                    <span className="text-[10px] font-bold text-orange-500 font-poppins uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3" /> Exact Citations ({msg.sources.length})
                    </span>
                    
                    <div className="flex flex-col gap-2">
                      {msg.sources.map((src, idx) => (
                        <details
                          key={idx}
                          className="group border border-gray-100 bg-gray-50/50 rounded-xl transition-all duration-200 overflow-hidden"
                        >
                          <summary className="flex items-center justify-between px-3 py-2 cursor-pointer select-none font-poppins text-xs font-bold text-gray-600 hover:text-orange-600 hover:bg-gray-50 transition-colors">
                            <span className="truncate pr-4">
                              📙 {src.book_title}
                            </span>
                            <span className="shrink-0 text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                              Page {src.page_number}
                            </span>
                          </summary>
                          
                          <div className="p-3 border-t border-gray-100/50 bg-white text-xs text-gray-600 leading-relaxed italic font-medium whitespace-pre-line border-l-2 border-orange-500/50">
                            "{src.text}"
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Loader Thinking State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-100/80 rounded-3xl p-5 shadow-xs max-w-[50%] flex items-center gap-3">
                <div className="flex gap-1.5 items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs font-semibold text-gray-400 font-mono tracking-wider">CONSULTING SACRED TEXTS...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
          <ChatBox onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </section>);
};
export default Chat;
