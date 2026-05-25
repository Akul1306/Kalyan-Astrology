"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookCard from "./BookCard";

const BookGrid = ({ books, searchQuery = "", onDelete }) => {
    const router = useRouter();

    // Filter books based on search query
    const filteredBooks = useMemo(() => {
        if (!searchQuery.trim())
            return books;
        const query = searchQuery.toLowerCase().trim();
        return books.filter((book) => book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.description?.toLowerCase().includes(query) ||
            book.category?.toLowerCase().includes(query) ||
            book.tags?.some((tag) => tag.toLowerCase().includes(query)));
    }, [books, searchQuery]);

    return (<div className="max-w-7xl mx-auto px-4 py-10">
      {searchQuery && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-gray-600 mb-6">
          Found {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} for "{searchQuery}"
        </motion.p>)}

      {filteredBooks.length === 0 && searchQuery ? (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-6">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600 max-w-md">
            We couldn't find any books matching "{searchQuery}". Try adjusting your search terms.
          </p>
        </motion.div>) : (<motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, idx) => {
              const bookId = book._id || book.id;
              return (
                <motion.div key={bookId} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}>
                  <BookCard
                    id={bookId}
                    image={book.image}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    onAskAI={() => router.push(`/education/chat?book=${encodeURIComponent(book.title)}`)}
                    onDelete={onDelete}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>)}
    </div>);
};
export default BookGrid;
