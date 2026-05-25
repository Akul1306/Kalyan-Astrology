"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Maximize2, Minimize2, Search, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, RotateCw, PiSquare, StretchHorizontal, } from "lucide-react";
const isPdf = (url) => /\.pdf(\?|#|$)/i.test(url);
const isDocx = (url) => /\.(doc|docx)(\?|#|$)/i.test(url);
export default function PaperFrame({ src, type, title, subtitle, allowDownload = false, allowPrint = false, height = "84vh", className, }) {
    const resolvedType = useMemo(() => {
        if (type)
            return type;
        if (isPdf(src))
            return "pdf";
        if (isDocx(src))
            return "docx";
        return "pdf";
    }, [src, type]);
    /**
     * IMPORTANT: Build the iframe URL *only on the client* to avoid SSR/CSR
     * mismatches and to ensure the correct origin/port is used in dev/prod.
     */
    const [frameUrl, setFrameUrl] = useState("about:blank");
    useEffect(() => {
        const origin = window.location.origin; // correct (includes :3000 in dev)
        if (resolvedType === "pdf") {
            const u = new URL("/pdfjs/web/viewer.html", origin);
            const fileParam = new URL(src, origin).toString();
            u.searchParams.set("file", fileParam);
            u.searchParams.set("download", "false");
            u.searchParams.set("print", allowPrint ? "true" : "false");
            // Reduce text selection; (viewer still has find/thumbnails/etc.)
            u.searchParams.set("disableTextLayer", "true");
            u.hash = "zoom=page-width";
            setFrameUrl(u.toString());
        }
        else {
            const u = new URL("https://view.officeapps.live.com/op/embed.aspx");
            u.searchParams.set("src", new URL(src, origin).toString());
            setFrameUrl(u.toString());
        }
    }, [resolvedType, src, allowPrint]);
    /** Anti-copy friction */
    const hostRef = useRef(null);
    useEffect(() => {
        const el = hostRef.current;
        if (!el)
            return;
        const onContextMenu = (e) => e.preventDefault();
        const onDragStart = (e) => e.preventDefault();
        const onKeyDown = (e) => {
            const key = e.key.toLowerCase();
            const meta = e.ctrlKey || e.metaKey;
            const block = (meta && (key === "c" || key === "s" || key === "p" || key === "a")) ||
                (meta && (key === "u" || key === "i" || key === "j")) ||
                key === "printscreen";
            if (block) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        el.addEventListener("contextmenu", onContextMenu);
        el.addEventListener("dragstart", onDragStart);
        window.addEventListener("keydown", onKeyDown, { capture: true });
        return () => {
            el.removeEventListener("contextmenu", onContextMenu);
            el.removeEventListener("dragstart", onDragStart);
            window.removeEventListener("keydown", onKeyDown, { capture: true });
        };
    }, []);
    /** Toolbar <-> PDF.js bindings (same-origin only) */
    const iframeRef = useRef(null);
    const [pdfReady, setPdfReady] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // When the iframe loads, try to hook into PDF.js API (same-origin)
    const onFrameLoad = () => {
        if (resolvedType !== "pdf")
            return;
        try {
            const win = iframeRef.current?.contentWindow;
            const app = win?.PDFViewerApplication;
            if (app) {
                const ready = () => {
                    try {
                        const total = app.pdfDocument?.numPages ?? app.pdfViewer?.pagesCount;
                        if (total) {
                            setPages(total);
                            setPage(app.pdfViewer.currentPageNumber || 1);
                            setPdfReady(true);
                            app.eventBus?.on?.("pageNumberChanged", (n) => setPage(n));
                            app.eventBus?.on?.("pagesloaded", (e) => {
                                setPages(e?.pagesCount || app.pdfViewer?.pagesCount || null);
                            });
                            return;
                        }
                    }
                    catch { }
                    setTimeout(ready, 120);
                };
                ready();
            }
        }
        catch {
            // cross-origin or blocked — still usable with native toolbar
            setPdfReady(false);
        }
    };
    // Toolbar helpers using PDF.js methods with safe fallbacks
    const call = (fn, fallback) => {
        try {
            const win = iframeRef.current?.contentWindow;
            const app = win?.PDFViewerApplication;
            if (app)
                return fn(app);
        }
        catch { }
        if (fallback)
            fallback();
    };
    const zoomIn = () => call((app) => app.zoomIn?.(), () => bumpHash("zoom", "+"));
    const zoomOut = () => call((app) => app.zoomOut?.(), () => bumpHash("zoom", "-"));
    const fitWidth = () => call((app) => (app.pdfViewer.currentScaleValue = "page-width"), () => setHashKV("zoom", "page-width"));
    const fitPage = () => call((app) => (app.pdfViewer.currentScaleValue = "page-fit"), () => setHashKV("zoom", "page-fit"));
    const rotate = () => call((app) => app.rotatePages?.(90), () => bumpHash("rotation", "+90"));
    const prevPage = () => call((app) => {
        const n = Math.max(1, (app.pdfViewer.currentPageNumber || 1) - 1);
        app.pdfViewer.currentPageNumber = n;
        setPage(n);
    }, () => setHashKV("page", String(Math.max(1, page - 1))));
    const nextPage = () => call((app) => {
        const max = pages || 1;
        const n = Math.min(max, (app.pdfViewer.currentPageNumber || 1) + 1);
        app.pdfViewer.currentPageNumber = n;
        setPage(n);
    }, () => setHashKV("page", String(page + 1)));
    const gotoPage = (n) => call((app) => {
        const max = pages || n;
        const p = Math.min(Math.max(1, n), max);
        app.pdfViewer.currentPageNumber = p;
        setPage(p);
    }, () => setHashKV("page", String(n)));
    // Hash helpers (fallback only)
    const setHashKV = (key, val) => {
        try {
            const w = iframeRef.current?.contentWindow;
            if (!w)
                return;
            const url = new URL(w.location.href);
            const h = new URLSearchParams(url.hash.replace(/^#/, ""));
            h.set(key, val);
            url.hash = h.toString();
            w.location.hash = url.hash;
        }
        catch { }
    };
    const bumpHash = (key, delta) => {
        try {
            const w = iframeRef.current?.contentWindow;
            if (!w)
                return;
            const url = new URL(w.location.href);
            const h = new URLSearchParams(url.hash.replace(/^#/, ""));
            const current = h.get(key) || (key === "zoom" ? "page-width" : "0");
            if (key === "zoom") {
                const numeric = Number(current.replace("%", ""));
                const next = isNaN(numeric)
                    ? "125"
                    : Math.max(25, Math.min(400, numeric + (delta === "+" ? 10 : -10)));
                h.set("zoom", `${next}`);
            }
            else {
                const cur = parseInt(current || "0", 10) || 0;
                const add = delta === "+90" ? 90 : -90;
                h.set("rotation", String((cur + add + 360) % 360));
            }
            url.hash = h.toString();
            w.location.hash = url.hash;
        }
        catch { }
    };
    // Fullscreen on the shell (esc to leave)
    const containerRef = useRef(null);
    const toggleFullscreen = async () => {
        const el = containerRef.current;
        if (!el)
            return;
        if (!document.fullscreenElement) {
            await el.requestFullscreen?.();
            setIsFullscreen(true);
        }
        else {
            await document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };
    useEffect(() => {
        const onFs = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onFs);
        return () => document.removeEventListener("fullscreenchange", onFs);
    }, []);
    const openInNewTab = () => window.open(src, "_blank", "noopener,noreferrer");
    const frameHeight = typeof height === "number" ? `${height}px` : height;
    return (<section ref={hostRef} className={clsx("relative w-full select-none", "rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur-md", "shadow-[0_10px_40px_rgba(0,0,0,0.06)]", "dark:bg-neutral-900/60 dark:border-neutral-800", className)} aria-label={title ?? "Paper viewer"}>
      {/* Header / meta */}
      <header className="relative z-10 flex items-center justify-between gap-3 px-5 py-3 border-b border-neutral-200/70 dark:border-neutral-800">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {title ?? (src.split("/").pop() || "Document")}
          </h2>
          {subtitle ? (<p className="truncate text-xs text-neutral-600 dark:text-neutral-400">{subtitle}</p>) : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
            {(resolvedType || "PDF").toUpperCase()}
          </span>
          {allowDownload && (<button onClick={openInNewTab} className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:translate-y-px dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700" aria-label="Open original file">
              Open file
            </button>)}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-12 rounded-t-2xl bg-gradient-to-b from-white/70 to-transparent dark:from-neutral-900/60"/>
      </header>

      {/* Toolbar (PDF only; DOCX uses Office UI) */}
      {resolvedType === "pdf" && (<div className="flex flex-wrap items-center gap-1.5 border-b border-neutral-200/70 bg-white/70 px-3 py-2 text-xs text-neutral-700 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-200" role="toolbar" aria-label="Reader controls">
          <button className="btn" onClick={prevPage} aria-label="Previous page">
            <ArrowLeft className="h-4 w-4"/>
          </button>
          <span className="px-1">
            <input aria-label="Page number" className="h-7 w-14 rounded border border-neutral-300 bg-white px-2 text-center text-xs outline-none dark:border-neutral-700 dark:bg-neutral-800" value={page} onChange={(e) => {
                const n = parseInt(e.target.value || "1", 10) || 1;
                setPage(n);
            }} onBlur={() => gotoPage(page)} onKeyDown={(e) => e.key === "Enter" && gotoPage(page)}/>{" "}
            / {pages ?? "—"}
          </span>
          <button className="btn" onClick={nextPage} aria-label="Next page">
            <ArrowRight className="h-4 w-4"/>
          </button>

          <span className="mx-2 hidden h-5 w-px bg-neutral-200 dark:bg-neutral-800 sm:inline"/>

          <button className="btn" onClick={zoomOut} aria-label="Zoom out">
            <ZoomOut className="h-4 w-4"/>
          </button>
          <button className="btn" onClick={zoomIn} aria-label="Zoom in">
            <ZoomIn className="h-4 w-4"/>
          </button>
          <button className="btn" onClick={fitWidth} aria-label="Fit width">
            <StretchHorizontal className="h-4 w-4"/>
          </button>
          <button className="btn" onClick={fitPage} aria-label="Fit page">
            <PiSquare className="h-4 w-4"/>
          </button>

          <span className="mx-2 hidden h-5 w-px bg-neutral-200 dark:bg-neutral-800 sm:inline"/>

          <button className="btn" onClick={rotate} aria-label="Rotate 90°">
            <RotateCw className="h-4 w-4"/>
          </button>

          <span className="mx-2 hidden h-5 w-px bg-neutral-200 dark:bg-neutral-800 sm:inline"/>

          <button className="btn" onClick={toggleFullscreen} aria-label="Fullscreen">
            {isFullscreen ? <Minimize2 className="h-4 w-4"/> : <Maximize2 className="h-4 w-4"/>}
          </button>

          <span className="ml-auto hidden items-center gap-1 opacity-70 sm:flex">
            <Search className="h-4 w-4"/>
            <span>Use viewer search (⌘/Ctrl + F)</span>
          </span>
        </div>)}

      {/* Viewer */}
      <div ref={containerRef} className="relative">
        {/* Edge fade for polish (non-blocking) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] rounded-b-2xl" style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent 60%, transparent 40%, rgba(255,255,255,0.06))",
        }}/>
        <iframe ref={iframeRef} onLoad={onFrameLoad} sandbox="allow-scripts allow-same-origin allow-forms" className="relative z-0 block w-full rounded-b-2xl bg-white dark:bg-neutral-900" src={frameUrl} title={title ?? "Paper"} referrerPolicy="no-referrer" style={{ height: frameHeight }}/>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-neutral-200/70 px-5 py-2.5 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-violet-500/80"/>
          Read-only preview (copy & print limited)
        </div>
        <div className="opacity-80">© {new Date().getFullYear()} PARAVIDYA FOUNDATION</div>
      </footer>

      {/* Styles */}
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 28px;
          width: 32px;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.8);
          transition: all 160ms cubic-bezier(0.19, 1, 0.22, 1);
        }
        .btn:hover {
          background: #fff;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        .btn:active {
          transform: translateY(0);
        }

        section {
          position: relative;
        }
        section::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1.5px;
          border-radius: 16px;
          background: linear-gradient(
            120deg,
            rgba(124, 58, 237, 0.8),
            rgba(168, 85, 247, 0.8),
            rgba(99, 102, 241, 0.8),
            rgba(124, 58, 237, 0.8)
          );
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 160ms cubic-bezier(0.19, 1, 0.22, 1),
            background-position 1.2s linear;
          z-index: -1;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
        }
        section:hover::before,
        section:focus-within::before {
          opacity: 1;
          background-position: 200% 50%;
        }
      `}</style>
    </section>);
}
