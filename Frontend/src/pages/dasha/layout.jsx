"use client";
import Sidebar from "@/components/layout/sidebar";
export default function DashaLayout({ children, }) {
    return (<div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 md:ml-72 ml-0 transition-all duration-300">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>);
}
