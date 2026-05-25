"use client";
import Sidebar from "@/components/layout/sidebar";
export default function AILayout({ children }) {
    return (<div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* LEFT SIDEBAR (Desktop Only) */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0">
          <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 mx-auto w-full">
        {children}
      </main>
    </div>);
}
