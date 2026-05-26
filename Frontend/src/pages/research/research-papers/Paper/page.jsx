"use client";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Topic from "@/components/research/paper/ResearchPaper/Topic";
import AuthorDetail from "@/components/research/paper/ResearchPaper/AuthDetail";
import PaperFrame from "@/components/research/paper/ResearchPaper/PaperFrame";

/**
 * PaperPage — dynamic research reading layout
 * - Left: topical metadata + author (sticky on desktop)
 * - Right: secure PaperFrame reader
 * - Right-click disabled & common copy/print shortcuts blocked at PAGE level
 * - Dynamic parameter parsing from router state and query search
 */
export default function PaperPage() {
    const rootRef = useRef(null);
    const location = useLocation();
    
    const queryParams = new URLSearchParams(location.search);
    
    // Extract dynamic paper details from location.state or query params
    const pdfUrl = location.state?.pdfUrl || queryParams.get("src") || "/Research-paper/Jyotish.pdf";
    const title = location.state?.title || queryParams.get("title") || "Planetary Influences on Human Psychology";
    const author = location.state?.author || queryParams.get("author") || "Dr. A.K. Sharma";
    const date = location.state?.date || queryParams.get("date") || "2025";
    const description = location.state?.description || queryParams.get("description") || "A study on how planetary positions influence emotional states and behavior.";

    // Page-level anti-copy friction (PaperFrame has its own too)
    useEffect(() => {
        const el = rootRef.current;
        if (!el)
            return;
        const onContext = (e) => e.preventDefault();
        const onKeyDown = (e) => {
            const meta = e.ctrlKey || e.metaKey;
            const k = e.key.toLowerCase();
            // copy / print / save / select all
            if (meta && ["c", "p", "s", "a"].includes(k)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        el.addEventListener("contextmenu", onContext);
        window.addEventListener("keydown", onKeyDown, { capture: true });
        return () => {
            el.removeEventListener("contextmenu", onContext);
            window.removeEventListener("keydown", onKeyDown, { capture: true });
        };
    }, []);

    // simple cite copy
    const handleCite = async () => {
        const text = `${author}. (${date}). ${title}. Kalyan Astrology Research Archive.`;
        try {
            await navigator.clipboard.writeText(text);
            alert("Citation copied to clipboard.");
        }
        catch {
            alert(text);
        }
    };

    // share / fallback
    const handleShare = async () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        const data = {
            title: title,
            text: description,
            url,
        };
        if (navigator.share) {
            try {
                await navigator.share(data);
            }
            catch {
                /* user canceled */
            }
        }
        else {
            try {
                await navigator.clipboard.writeText(url);
                alert("Link copied to clipboard.");
            }
            catch {
                /* ignore */
            }
        }
    };

    return (<main ref={rootRef} className="min-h-screen w-full bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      {/* Page header bar */}
      <div className="w-full border-b border-neutral-200/70 bg-white/70 backdrop-blur-md dark:bg-neutral-900/60 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="text-xs text-neutral-500 dark:text-neutral-400">
            <span className="hover:text-neutral-700 dark:hover:text-neutral-200 cursor-default">
              Research
            </span>{" "}
            / <span className="text-neutral-800 dark:text-neutral-200">Paper</span>
          </nav>
        </div>
      </div>

      {/* Content grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT rail – sticky on desktop */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 lg:space-y-6">
              <Topic title={title} author={author} description={<>
                    <h4 className="mb-2 text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                      Journal Information
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-800/90 dark:text-neutral-200/90">
                      {description}
                    </p>

                    {/* Small meta chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                        {date}
                      </span>
                      <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                        Peer-Reviewed
                      </span>
                      <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                        PDF Document
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button onClick={handleCite} className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:translate-y-px dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 cursor-pointer">
                        Cite
                      </button>
                      <button onClick={handleShare} className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:translate-y-px dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 cursor-pointer">
                        Share
                      </button>
                    </div>
                  </>}/>

              <AuthorDetail avatarSrc="/images/avatar.png" name={author} status="Astrology Expert" bio={<>
                    {author} is a vetted scholar sharing valuable astrological research and traditional Jyotish principles on the Kalyan platform.
                  </>} priorityImage/>
            </div>
          </aside>

          {/* RIGHT – Paper frame */}
          <section className="lg:col-span-8">
            <PaperFrame src={pdfUrl} title={title} subtitle="Research Archive • PDF" allowDownload={false} allowPrint={false}/>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        © {new Date().getFullYear()} PARAVIDYA FOUNDATION · All rights reserved.
      </footer>
    </main>);
}
