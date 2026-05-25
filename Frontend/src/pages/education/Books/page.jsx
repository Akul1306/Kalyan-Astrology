"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKundliStore } from "@/lib/store";
import BookGrid from "@/components/education/Book/BookGrid";
import EduHeroSection from "@/components/education/Book/eduhero";
import MovingGradient from "@/components/store/Perfume/MovingGradient";
import { Plus, X, Upload, BookOpen, ShieldAlert } from "lucide-react";

export default function Page() {
    const { currentUser, token, isAuthenticated } = useKundliStore();
    const isAdmin = isAuthenticated && currentUser?.role === "admin";

    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);

    // Form inputs state
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("Astrology");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // Toast alert states
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState("success");

    const showToast = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => setToastMessage(null), 4000);
    };

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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type !== "application/pdf") {
                showToast("Only PDF files are allowed", "error");
                e.target.value = null;
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !author.trim() || !description.trim() || !selectedFile) {
            showToast("Please fill in all required fields and select a PDF file.", "error");
            return;
        }

        setUploadLoading(true);

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("author", author.trim());
        formData.append("category", category);
        formData.append("tags", tags.trim());
        formData.append("description", description.trim());
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/books", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok || data.status === "fail") {
                throw new Error(data.message || "Failed to upload book");
            }

            showToast("Book uploaded successfully! 📚✨");
            setIsDrawerOpen(false);
            
            // Reset form fields
            setTitle("");
            setAuthor("");
            setCategory("Astrology");
            setTags("");
            setDescription("");
            setSelectedFile(null);
            
            // Refresh books grid
            fetchBooks();
        } catch (error) {
            showToast(error.message || "Error uploading book. Try again.", "error");
        } finally {
            setUploadLoading(false);
        }
    };

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

            showToast("Book deleted successfully!");
            fetchBooks();
        } catch (error) {
            showToast(error.message || "Error deleting book. Try again.", "error");
        }
    };

    return (<main className="relative min-h-screen bg-transparent">
      <MovingGradient />
      {/* Toast Alerts System */}
      <AnimatePresence>
          {toastMessage && (
              <motion.div
                  initial={{ opacity: 0, x: -100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 120 }}
                  className="fixed bottom-8 left-8 z-50 pointer-events-none max-w-sm"
              >
                  <div className={`px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-sm font-semibold backdrop-blur-md flex items-center gap-3 border ${
                      toastType === "success"
                          ? "bg-emerald-950/95 text-emerald-100 border-emerald-500/30"
                          : "bg-rose-950/95 text-rose-100 border-rose-500/30"
                  }`}>
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-xs shadow-sm ${
                          toastType === "success" 
                              ? "bg-emerald-500 text-white" 
                              : "bg-rose-500 text-white"
                      }`}>
                          {toastType === "success" ? "✓" : "⚠️"}
                      </span>
                      <span className="font-poppins leading-tight">{toastMessage}</span>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      <EduHeroSection onSearchChange={setSearchQuery}/>

      {/* Admin Actions Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
              {isAuthenticated && currentUser ? (
                  <div className="flex items-center gap-2.5 bg-neutral-950 text-white px-4 py-2 rounded-2xl border border-neutral-800 shadow-md">
                      <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5 font-poppins">
                          {isAdmin ? (
                              <>
                                  <span className="text-amber-400">Admin:</span> {currentUser.name}
                              </>
                          ) : (
                              <>
                                  <span className="text-sky-400">User:</span> {currentUser.name}
                              </>
                          )}
                      </span>
                  </div>
              ) : (
                  <div className="text-gray-500 text-xs font-semibold tracking-wide flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-4 py-2 rounded-2xl shadow-xs font-poppins">
                      <span>🌌 Explore sacred scriptures & classical books</span>
                  </div>
              )}
          </div>

          {/* Admin Only Upload Button */}
          {isAdmin && (
              <button
                  onClick={() => {
                      setTitle("");
                      setAuthor("");
                      setCategory("Astrology");
                      setTags("");
                      setDescription("");
                      setSelectedFile(null);
                      setIsDrawerOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-350 cursor-pointer font-poppins"
              >
                  <Plus className="h-4.5 w-4.5" /> Upload Classical Book
              </button>
          )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-500 font-mono text-sm tracking-wider">Accessing Divine Archives...</p>
        </div>
      ) : (
        <BookGrid books={books} searchQuery={searchQuery} onDelete={handleDeleteBook} />
      )}
      
      {/* Upload Book Slide-over Drawer */}
      <AnimatePresence>
          {isDrawerOpen && (
              <>
                  {/* Backdrop */}
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsDrawerOpen(false)}
                      className="fixed inset-0 bg-black/60 z-40 backdrop-blur-xs"
                  />
                  
                  {/* Drawer */}
                  <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto flex flex-col border-l border-gray-100"
                  >
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50/10">
                          <div>
                              <h3 className="text-lg font-bold text-gray-900 font-poppins flex items-center gap-2">
                                  <BookOpen className="h-5 w-5 text-orange-600" /> Upload Astrology Book
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5 font-poppins">
                                  Add books to the library. Note: Classical texts are automatically mapped to active AI queries.
                              </p>
                          </div>
                          <button
                              onClick={() => setIsDrawerOpen(false)}
                              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                          >
                              <X className="h-5 w-5" />
                          </button>
                      </div>

                      {/* Form Body */}
                      <form onSubmit={handleFormSubmit} className="flex-grow p-6 flex flex-col gap-5 overflow-y-auto font-poppins">
                          {/* Title */}
                          <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                  Book Title <span className="text-rose-500">*</span>
                              </label>
                              <input
                                  type="text"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  placeholder="e.g. Elements Of Vedic Astrology"
                                  required
                                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-sm font-poppins"
                              />
                          </div>

                          {/* Author */}
                          <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                  Author Name <span className="text-rose-500">*</span>
                              </label>
                              <input
                                  type="text"
                                  value={author}
                                  onChange={(e) => setAuthor(e.target.value)}
                                  placeholder="e.g. Dr. K.S. Charak"
                                  required
                                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-sm font-poppins"
                              />
                          </div>

                          {/* Category */}
                          <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                  Category <span className="text-rose-500">*</span>
                              </label>
                              <select
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-sm bg-white font-poppins cursor-pointer"
                              >
                                  <option value="Astrology">Astrology</option>
                                  <option value="Vastu Shastra">Vastu Shastra</option>
                                  <option value="Remedial Astrology">Remedial Astrology</option>
                                  <option value="Numerology">Numerology</option>
                                  <option value="Karma & Spirituality">Karma & Spirituality</option>
                                  <option value="Academic Astrology">Academic Astrology</option>
                                  <option value="Educational">Educational</option>
                                  <option value="Spiritual">Spiritual</option>
                              </select>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                  Tags / Keywords (Comma separated)
                              </label>
                              <input
                                  type="text"
                                  value={tags}
                                  onChange={(e) => setTags(e.target.value)}
                                  placeholder="e.g. Jyotish, Birth Chart, Remedies"
                                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-sm font-poppins"
                              />
                          </div>

                          {/* Description */}
                          <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                  Short Description <span className="text-rose-500">*</span>
                              </label>
                              <textarea
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  placeholder="Brief overview of the book contents..."
                                  required
                                  rows={4}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-sm resize-none font-poppins"
                              />
                          </div>

                          {/* File Attachment (PDF Only) */}
                          <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                  Attach Book PDF File <span className="text-rose-500">*</span>
                              </label>
                              
                              <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:bg-orange-50/5 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer text-center">
                                  <input
                                      type="file"
                                      accept=".pdf"
                                      required
                                      onChange={handleFileChange}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  
                                  <Upload className={`h-8 w-8 mb-2 transition-colors ${selectedFile ? "text-emerald-500" : "text-gray-400 group-hover:text-orange-500"}`} />
                                  
                                  {selectedFile ? (
                                      <div>
                                          <p className="text-sm font-semibold text-gray-800 leading-snug">
                                              {selectedFile.name}
                                          </p>
                                          <p className="text-xs text-emerald-600 font-semibold mt-1">
                                              PDF Selected ✓ ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                          </p>
                                      </div>
                                  ) : (
                                      <div>
                                          <p className="text-sm font-semibold text-gray-700 leading-snug">
                                              Select book PDF file
                                          </p>
                                          <p className="text-[10px] text-gray-400 mt-1 font-semibold">
                                              PDF only, max size 15MB
                                          </p>
                                      </div>
                                  )}
                              </div>
                          </div>

                          {/* Footer Submit Buttons */}
                          <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-3">
                              <button
                                  type="button"
                                  onClick={() => setIsDrawerOpen(false)}
                                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-sm font-semibold transition-all duration-200 cursor-pointer text-center"
                              >
                                  Cancel
                              </button>
                              <button
                                  type="submit"
                                  disabled={uploadLoading || !title.trim() || !author.trim() || !description.trim() || !selectedFile}
                                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5"
                              >
                                  {uploadLoading ? (
                                      <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                                          Uploading...
                                      </>
                                  ) : (
                                      "Upload Book"
                                  )}
                              </button>
                          </div>
                      </form>
                  </motion.div>
              </>
          )}
      </AnimatePresence>
    </main>);
}
