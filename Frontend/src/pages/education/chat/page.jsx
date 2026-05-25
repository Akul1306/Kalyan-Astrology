"use client";
import React, { useState, useEffect } from "react";
import BookGrid from "@/components/education/Book/BookGrid";
import Chat from "@/components/education/Book/chat";
import { useKundliStore } from "@/lib/store";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

export default function Page() {
    const { token } = useKundliStore();
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            const response = await fetch("/api/books");
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            if (data.status === "success" && data.data?.books) {
                setBooks(data.data.books);
            }
        } catch (error) {
            console.error("Could not fetch books from API:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDeleteBook = async (id) => {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete book");
            }
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (<main className="relative min-h-screen bg-transparent">
      <MovingGradient />
      <Chat />
      
      <div className="bg-white/70 backdrop-blur-md py-12 border-t border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Our Vedic Library
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:mt-4">
            Select any classical astrology or vastu text from our collection to ask the AI questions.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-400 font-mono text-xs tracking-wider">Accessing Bookshelf...</p>
          </div>
        ) : (
          <BookGrid books={books} searchQuery={searchQuery} onDelete={handleDeleteBook} />
        )}
      </div>
    </main>);
}
