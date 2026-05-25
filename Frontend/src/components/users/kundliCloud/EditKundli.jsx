"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function EditKundli({ open, onClose, data, onSave }) {
    const [form, setForm] = useState({});
    const wrapperRef = useRef(null);
    const firstInputRef = useRef(null);
    useEffect(() => {
        setForm({ ...(data || {}) });
    }, [data]);
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            setTimeout(() => firstInputRef.current?.focus(), 80);
        }
        else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape")
                onClose();
        }
        if (open)
            window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    const stop = (e) => e.stopPropagation();
    function updateField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }
    return (<AnimatePresence>
      {open && (<motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div ref={wrapperRef} onClick={stop} initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.28 }} className="w-full max-w-2xl rounded-2xl bg-white border border-yellow-100/60 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Kundli</h3>

            <form onSubmit={(e) => {
                e.preventDefault();
                onSave(form);
                onClose();
            }} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Full name</span>
                  <input ref={firstInputRef} value={form.name ?? ""} onChange={(e) => updateField("name", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Place</span>
                  <input value={form.place ?? ""} onChange={(e) => updateField("place", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">DOB</span>
                  <input value={form.dob ?? ""} onChange={(e) => updateField("dob", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200" placeholder="YYYY-MM-DD"/>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">TOB</span>
                  <input value={form.tob ?? ""} onChange={(e) => updateField("tob", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200" placeholder="HH:MM"/>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Gender</span>
                  <input value={form.gender ?? ""} onChange={(e) => updateField("gender", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Rashi</span>
                  <input value={form.rashi ?? ""} onChange={(e) => updateField("rashi", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Nakshatra</span>
                  <input value={form.nakshatra ?? ""} onChange={(e) => updateField("nakshatra", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Lagna</span>
                  <input value={form.lagna ?? ""} onChange={(e) => updateField("lagna", e.target.value)} className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
                </label>
              </div>

              {/* Tags input (comma separated) */}
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Tags (comma separated)</span>
                <input value={form.tags ?? ""} onChange={(e) => updateField("tags", e.target.value)} placeholder="e.g. family, client, natal" className="rounded-lg border border-yellow-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"/>
              </label>

              <div className="mt-3 flex items-center justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm bg-white border border-gray-200">
                  Cancel
                </button>

                <button type="submit" className="rounded-lg px-4 py-2 text-sm bg-yellow-400 text-white shadow">
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>)}
    </AnimatePresence>);
}
