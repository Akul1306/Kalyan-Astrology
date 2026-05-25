import "../index.css";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import DefaultSEO from "@/components/seo/default-seo";
import StructuredData from "@/components/seo/structured-data";
import { Providers } from "@/components/providers";

import { useLocation } from "react-router-dom";

/**
 * RootLayout — React/Vite version.
 *
 * In Next.js App Router this file exported <html><body>…</body></html>.
 * In React/Vite, <html> and <body> already exist in index.html and must NOT
 * be rendered again inside <div id="root"> — doing so causes:
 *   "In HTML, <html> cannot be a child of <div>."
 *
 * Next.js-specific exports (metadata, viewport, dynamic) are kept as
 * dead exports so they don't cause import errors in any file that
 * re-exports them, but they have no runtime effect in Vite.
 */

// ── Next.js metadata stubs (no-op in Vite) ─────────────────────────────────
const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.kalyan.example";

export const viewport = { themeColor: "#ffffff" };
export const dynamic = "force-dynamic";
export const metadata = {
    title: {
        default: "Kalyan - Professional Vedic Astrology",
        template: "%s | Kalyan",
    },
    description:
        "Generate accurate Kundli charts with detailed predictions and astrological analysis. AI-enabled Vedic astrology platform for precise birth charts, matchmaking, and spiritual insights.",
};
// ───────────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
    const location = useLocation();

    // Check if the current route has a custom sidebar or dashboard layout
    const isDashboardOrReport = 
        location.pathname.startsWith("/dashboard") ||
        location.pathname.startsWith("/match-making/MatchMakingReport") ||
        location.pathname.startsWith("/KundliCloud") ||
        location.pathname.startsWith("/kundli-cloud") ||
        location.pathname.startsWith("/profile") ||
        location.pathname.startsWith("/settings") ||
        location.pathname.startsWith("/Cart") ||
        location.pathname.startsWith("/SavedPaper") ||
        location.pathname.startsWith("/EducationTest");

    return (
        <Providers>
            <DefaultSEO />
            <StructuredData />
            <Header />
            <main className="flex-1 flex flex-col relative z-10">
                <div className="flex-grow flex flex-col w-full relative z-10">
                    {children}
                </div>
                {!isDashboardOrReport && <Footer />}
            </main>
        </Providers>
    );
}

