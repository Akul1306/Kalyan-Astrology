"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BookMarked, Layers, Menu, ScrollText, Settings, ShoppingBag, User, } from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardNavLinks } from "@/lib/dashboard-data";
import { Footer } from "@/components/layout/footer";

const iconMap = {
    User,
    ShoppingBag,
    Settings,
    ScrollText,
    BookMarked,
    Layers,
};

export function DashboardShell({ title, description, actions, children, rightPanel, }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const links = useMemo(() => dashboardNavLinks, []);

    /* ---------------- Sidebar Content ---------------- */
    const sidebarContent = (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="flex h-full flex-col justify-between">
      <div className="space-y-6">

        {/* Collapse Button */}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="
            flex items-center gap-2 rounded-xl border border-yellow-100 
            bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] 
            text-gray-600 shadow-sm hover:bg-yellow-50 transition
          " onClick={() => {
            if (window.innerWidth < 1024)
                setMobileOpen(false);
            else
                setCollapsed((v) => !v);
        }}>
          <Menu className="h-4 w-4"/>
          {!collapsed && <span>Menu</span>}
        </motion.button>

        {/* Nav Links */}
        <nav className="space-y-1">
          {links.map((link, index) => {
            const Icon = iconMap[link.icon] ?? Menu;
            const isActive = pathname === link.href;
            return (<motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: index * 0.03 }}>
                <Link href={link.href} onClick={() => window.innerWidth < 1024 && setMobileOpen(false)} className={cn("group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition border shadow-sm", isActive
                    ? "bg-yellow-50 border-yellow-200 text-gray-900 shadow-[0_3px_12px_rgba(255,215,100,0.28)]"
                    : "border-white text-gray-500 hover:bg-yellow-50 hover:text-gray-800", collapsed && "justify-center px-2")}>
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-yellow-700"/>
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              </motion.div>);
        })}
        </nav>
      </div>
    </motion.div>);

    /* ---------------- Main Layout ---------------- */
    return (<div className="relative isolate min-h-[100vh] bg-white">

      {/* Light radial background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,245,200,0.18)_0%,transparent_55%)]"/>

      <div className="relative mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">

          {/* Sidebar */}
          <div className="lg:w-64 xl:w-72">

            {/* Mobile Overlay */}
            <motion.div onClick={() => setMobileOpen(false)} className={cn("fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden", mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none")}/>

            {/* Sidebar Box */}
            <motion.div animate={{
            width: collapsed ? 80 : 260,
        }} transition={{ type: "spring", stiffness: 140, damping: 18 }} className={cn("fixed left-4 top-24 z-40 rounded-2xl border border-yellow-200 bg-white p-5 shadow-lg transition-all lg:sticky lg:top-24 lg:z-auto", mobileOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0")}>
              {sidebarContent}
            </motion.div>
          </div>

          {/* Main */}
          <div className="flex-1 lg:pl-6">

            {/* Mobile Menu Button */}
            <motion.button initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }} onClick={() => setMobileOpen(true)} className="
                mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 
                bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] 
                text-gray-600 shadow-sm lg:hidden
              ">
              <Menu className="h-4 w-4"/>
              Menu
            </motion.button>

            {/* Page Header */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Dashboard
                </p>
                <h1 className="font-mono text-3xl text-gray-900">{title}</h1>
                {description && (<p className="mt-2 text-base text-gray-500">{description}</p>)}
              </div>

              {actions}
            </motion.div>

            {/* Page transition */}
            <AnimatePresence mode="wait">
              <motion.section key={pathname} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                {children}
              </motion.section>
            </AnimatePresence>

            {/* Inner scrollable layout footer */}
            <div className="mt-16 border-t border-gray-100/60 pt-8">
              <Footer />
            </div>
          </div>


        </div>
      </div>
    </div>);
}
