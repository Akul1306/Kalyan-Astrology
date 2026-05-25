"use client";
import { useEffect, useRef } from "react";
import Topic from "@/components/research/paper/ResearchPaper/Topic";
import AuthorDetail from "@/components/research/paper/ResearchPaper/AuthDetail";
import PaperFrame from "@/components/research/paper/ResearchPaper/PaperFrame";
/**
 * PaperPage — research reading layout
 * - Left: topical metadata + author (sticky on desktop)
 * - Right: secure PaperFrame reader
 * - Right-click disabled & common copy/print shortcuts blocked at PAGE level
 * - Small action bar: Cite (copies), Share (Web Share / fallback), Open (if allowed)
 */
export default function PaperPage() {
    const rootRef = useRef(null);
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
        const text = `Sharma, A. K. (2025). Planetary Influences on Human Psychology. ` +
            `Journal of Vedic Studies.`;
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
            title: "Planetary Influences on Human Psychology",
            text: "A study on how planetary positions influence emotional states and behavior.",
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
              <Topic title="Planetary Influences on Human Psychology" author="Dr. A.K. Sharma" description={<>
                    <h4 className="mb-2 text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                      Journal Information
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-800/90 dark:text-neutral-200/90">
                      A deep study analyzing how planetary positions influence
                      emotional states and behavioral tendencies, referencing classic
                      Jyotish texts with modern psychology.
                    </p>

                    {/* Small meta chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                        2025 · Vol 12(1)
                      </span>
                      <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                        Peer-Reviewed
                      </span>
                      <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                        PDF • 9 pages
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button onClick={handleCite} className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:translate-y-px dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
                        Cite
                      </button>
                      <button onClick={handleShare} className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:translate-y-px dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700">
                        Share
                      </button>
                    </div>
                  </>}/>

              <AuthorDetail avatarSrc="/images/avatar.png" name="Dr. A.K. Sharma" status="Practicing Astrologer" bio={<>
                    Dr. A.K. Sharma is a practicing astrologer with a research focus
                    on psychodynamics and traditional Jyotish. He studies how planetary
                    signatures intersect with modern behavioral science.
                  </>} priorityImage/>
            </div>
          </aside>

          {/* RIGHT – Paper frame */}
          <section className="lg:col-span-8">
          <PaperFrame src="/Research-paper/Jyotish.pdf" title="The Astrology of Seers" subtitle="Research Archive • PDF" allowDownload={false} allowPrint={false}/>

          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        © {new Date().getFullYear()} PARAVIDYA FOUNDATION · All rights reserved.
      </footer>
    </main>);
}
