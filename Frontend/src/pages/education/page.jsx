"use client";
import React, { useState, useEffect } from "react";
import BookGrid from "@/components/education/Book/BookGrid";
import EduHeroSection from "@/components/education/Book/eduhero";
import TestSection from "@/components/education/test/testsection";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

export default function Page() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("/api/books");
                const data = await response.json();
                if (data.status === "success" && data.data?.books) {
                    setBooks(data.data.books);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (<main className="relative min-h-screen bg-transparent">
      <MovingGradient />
      <EduHeroSection onSearchChange={setSearchQuery}/>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500 font-mono text-sm tracking-wider">Loading Vedic Bookshelf...</p>
        </div>
      ) : (
        <BookGrid books={books} searchQuery={searchQuery}/>
      )}
      <TestSection />
    </main>);
}
