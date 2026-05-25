"use client";
import Sidebar from "@/components/layout/sidebar";
import AIChatBot from "@/components/Chatbot/AIChatBot";
import { Footer } from "@/components/layout/footer";

export default function MatchMakingLayout({ children, }) {
    const handleSend = (message) => {
        // Handle chat message send
        if (process.env.NODE_ENV === "development") {
            console.log(message);
        }
    };
    return (<div className="relative flex min-h-screen bg-white">
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]">
        <div className="
          mx-auto 
          w-full 
          max-w-7xl 
          flex-1
          flex 
          flex-col 
          gap-10 
          px-4 
          py-10 
          sm:px-6 
          lg:flex-row 
          lg:items-start 
          lg:justify-between 
          lg:px-10
        ">

          {/* CENTER CONTENT */}
          <section className="flex-1 min-w-0">
            {children}
          </section>

          {/* RIGHT CHATBOT COLUMN */}
          <aside className="w-full lg:max-w-sm lg:sticky lg:top-20 shrink-0">
            <AIChatBot onSend={handleSend}/>
          </aside>

        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-100/60 mt-10">
          <Footer />
        </div>
      </main>
    </div>);
}
