"use client";
import AIChatBot from "@/components/Chatbot/AIChatBot";
import Sidebar from "@/components/layout/sidebar";
export default function ChartsLayout({ children }) {
    return (<div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* LEFT SIDEBAR (Desktop Only) */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0">
          <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 mx-auto w-full">
        {children}
      </main>

      {/* RIGHT CHATBOT (Desktop Only) */}
      <aside className="hidden lg:block lg:max-w-sm shrink-0">
        <div className="py-1">
          <AIChatBot />
        </div>
      </aside>

      {/* MOBILE CHATBOT (Bottom) */}
      <div className="lg:hidden mt-6">
        <AIChatBot />
      </div>
    </div>);
}
