"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Home, BarChart3, FileText, User, Settings, ChevronLeft, ChevronRight, Calendar, ShoppingCart, BookOpen, Layers, PieChart, Cpu, SunMoon, LogOut, Grid, MapPin, Database, Layers2, Menu, } from "lucide-react";
import clsx from "clsx";
/* Utility classnames helper */
function cn(...args) {
    return args.filter(Boolean).join(" ");
}
/* Icon registry */
const Icons = {
    Search,
    Home,
    BarChart3,
    FileText,
    User,
    Settings,
    Calendar,
    ShoppingCart,
    BookOpen,
    Layers,
    PieChart,
    Cpu,
    SunMoon,
    LogOut,
    Grid,
    MapPin,
    Database,
    Layers2,
    Menu,
};
const SIDEBAR_SECTIONS = [
    {
        title: "Main",
        items: [
            { name: "Home", href: "/", icon: "Home" },
            { name: "Profile", href: "/profile", icon: "User" },
            { name: "Store", href: "/store", icon: "ShoppingCart" },
            { name: "Research", href: "/research", icon: "FileText" },
            { name: "Education", href: "/education", icon: "BookOpen" },
        ],
    },
    {
        title: "Kundli & Charts",
        items: [
            { name: "D1 - Lagna Chart", href: "/charts/d1" },
            { name: "Planetary Positions", href: "/charts/planets" },
            { name: "House Report", href: "/charts/houses" },
            { name: "Aspects & Conjunctions", href: "/charts/aspects" },
            { name: "Yogas & Doshas", href: "/charts/yogas" },
        ],
    },
    {
        title: "Divisional Charts",
        items: [
            { name: "D2 - Hora", href: "/charts/d2" },
            { name: "D3 - Drekkana", href: "/charts/d3" },
            { name: "D4 - Chaturthamsa", href: "/charts/d4" },
            { name: "D7 - Saptamsa", href: "/charts/d7" },
            { name: "D9 - Navamsa", href: "/charts/d9" },
            { name: "D10 - Dasamsa", href: "/charts/d10" },
            { name: "D12 - Dwadashamsa", href: "/charts/d12" },
            { name: "D16 - Kalamsa", href: "/charts/d16" },
            { name: "D20 - Vimsamsa", href: "/charts/d20" },
            { name: "D24 - Chaturvimshamsa", href: "/charts/d24" },
            { name: "D30 - Trimshamsa", href: "/charts/d30" },
            { name: "D45 - Akshavedamsa", href: "/charts/d45" },
            { name: "D60 - Shashtiamsa", href: "/charts/d60" },
        ],
    },
    {
        title: "Advanced Charts",
        items: [
            { name: "Life Prediction Chart", href: "/advanced/life-prediction" },
            { name: "Cosmic DNA Chart", href: "/advanced/cosmic-dna" },
            { name: "Rectification Tools", href: "/advanced/rectification" },
            { name: "Famous Comparison", href: "/advanced/celebrity-compare" },
        ],
    },
    {
        title: "Dasha System",
        items: [
            { name: "All Dasha Overview", href: "/dasha" },
            { name: "Vimshottari Dasha", href: "/dasha/vimshottari" },
            { name: "Chara Dasha", href: "/dasha/chara" },
            { name: "Yogini Dasha", href: "/dasha/yogini" },
            { name: "Varshphal (Annual)", href: "/dasha/varshphal" },
        ],
    },
    {
        title: "AI Features",
        items: [
            { name: "AI Dasha Predictions", href: "/ai/dasha" },
            { name: "AI Remedies & Solutions", href: "/ai/remedies" },
            { name: "AI Chatbot", href: "/ai/chat" },
            { name: "PDF Summary Generator", href: "/ai/pdf" },
        ],
    },
    {
        title: "Calculations",
        items: [
            { name: "Saptavarga", href: "/calculations/saptavarga" },
            { name: "Ashtakavarga", href: "/calculations/ashtakavarga" },
            { name: "Shadbala", href: "/calculations/shadbala" },
            { name: "Shadow Planets", href: "/calculations/shadow-planets" },
            { name: "Transits", href: "/calculations/transits" },
        ],
    },
    {
        title: "Learning & Research",
        items: [
            { name: "Education Books", href: "/education/Books" },
            { name: "Research Papers", href: "/research/research-papers" },
            { name: "AI Blogs", href: "/research/aiblogs" },
            { name: "Blogs", href: "/research/blogs" },
            { name: "Saved Papers", href: "/SavedPaper" },
        ],
    },
    {
        title: "Store",
        items: [
            { name: "All Products", href: "/store" },
            { name: "Gemstones", href: "/store/gems" },
            { name: "Accessories", href: "/store/accessories" },
            { name: "Perfume", href: "/store/perfume" },
            { name: "Poster", href: "/store/poster" },
            { name: "Bracelet", href: "/store/bracelet" },
            { name: "Cart", href: "/Cart" },
        ],
    },
    {
        title: "Preferences",
        items: [
            { name: "Settings", href: "/settings", icon: "Settings" },
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Contact", href: "/contact" },
        ],
    },
];
export default function Sidebar({ className }) {
    const pathname = usePathname() || "/";
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [query, setQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", collapsed.toString());
    }, [collapsed]);
    const toggleSidebar = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        }
        else {
            setCollapsed(!collapsed);
        }
    };
    const handleSearchSubmit = (e) => {
        e?.preventDefault();
        if (!query.trim())
            return;
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
    };
    return (<>
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (<div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileOpen(false)}/>)}
      
      {/* Mobile Menu Button */}
      {isMobile && (<button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden" aria-label="Toggle sidebar">
          <Menu className="h-6 w-6 text-gray-700"/>
        </button>)}

      <motion.aside initial={false} animate={{
            width: collapsed && !isMobile ? 80 : 288,
        }} transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }} className={clsx("sticky top-0 left-0 z-40 flex flex-col h-screen", "bg-white/95 backdrop-blur-xl border-r border-gray-100/80", "shadow-[0_0_24px_rgba(255,244,194,0.08)]", isMobile && !mobileOpen && "-translate-x-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100/60">
        <div className={clsx("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed ? (<Link href="/" className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-9 w-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-[0_4px_12px_rgba(255,244,194,0.4)]">
                K
              </motion.div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">
                Kalyan
              </span>
            </Link>) : (<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-9 w-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-[0_4px_12px_rgba(255,244,194,0.4)]">
              K
            </motion.div>)}
        </div>
        {!isMobile && (<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-gray-100/80 transition-colors" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? (<ChevronRight className="h-5 w-5 text-gray-600"/>) : (<ChevronLeft className="h-5 w-5 text-gray-600"/>)}
          </motion.button>)}
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100/60">
        <form onSubmit={handleSearchSubmit} className="relative">
          {!collapsed && (<input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="w-full rounded-lg border border-gray-200/60 bg-gray-50/50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-300/50 focus:outline-none transition-all"/>)}
          <Search onClick={() => !collapsed && handleSearchSubmit()} className={clsx("absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400", collapsed && "left-1/2 -translate-x-1/2")} size={18}/>
        </form>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4" role="navigation" aria-label="Sidebar">
        {SIDEBAR_SECTIONS.map((section, i) => (<div key={section.title || `section-${i}`}>
            {i > 0 && <div className="h-px bg-gray-200 dark:bg-neutral-800 my-2"/>}
            {section.title && (<div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {section.title}
              </div>)}

            <div className="mt-1 space-y-1">
              {section.items.flatMap((item) => {
                const Icon = item.icon ? Icons[item.icon] : null;
                const entries = item.children && item.children.length > 0 ? item.children : [item];
                return entries.map((linkItem) => {
                    const targetHref = linkItem.href || item.href || "#";
                    const isActive = pathname === targetHref;
                    return (<motion.div key={`${item.name}-${linkItem.name || targetHref}`} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                      <Link href={targetHref} className={clsx("flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all", isActive
                            ? "bg-yellow-50/80 text-gray-900 font-medium shadow-[0_2px_8px_rgba(255,244,194,0.3)] border border-yellow-200/40"
                            : "text-gray-700 hover:bg-gray-50/80", collapsed && "justify-center")} aria-current={isActive ? "page" : undefined}>
                        {Icon && <Icon className="h-4 w-4"/>}
                        {!collapsed && (linkItem.name || item.name)}
                      </Link>
                    </motion.div>);
                });
            })}
            </div>
          </div>))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100/60 space-y-2">
        <motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }} onClick={() => router.push("/login")} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100/80 transition-colors w-full text-sm text-gray-700">
          <LogOut className="h-4 w-4"/>
          {!collapsed && "Logout"}
        </motion.button>
      </div>
    </motion.aside>
    </>);
}
