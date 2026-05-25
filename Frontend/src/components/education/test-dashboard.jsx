"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookmarkCheck, NotebookPen, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { TestCard } from "@/components/cards/test-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const motionConfig = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1],
};
const sampleQuestion = {
    prompt: "Which planet currently holds the highest charge in your Navamsa for relational softness?",
    options: ["Venus exalted", "Moon luminous", "Mercury retrograde", "Saturn patient"],
    insight: "Mapping these preferences lets the AI layer remedies onto your Saved Papers automatically.",
};
export function TestDashboard({ tests }) {
    const router = useRouter();
    const [stage, setStage] = useState("idle");
    const [currentTest, setCurrentTest] = useState(null);
    const [selected, setSelected] = useState(null);
    const [saved, setSaved] = useState(false);
    const [booting, setBooting] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setBooting(false), 320);
        return () => clearTimeout(timer);
    }, []);
    // New vs attempted tests
    const { attemptedTests, newTests } = useMemo(() => {
        const attempted = [];
        const fresh = [];
        for (const test of tests) {
            const status = test?.status;
            const attempts = test?.attempts;
            const isAttempted = status === "completed" ||
                status === "in-progress" ||
                (attempts !== undefined && attempts > 0);
            if (isAttempted)
                attempted.push(test);
            else
                fresh.push(test);
        }
        return { attemptedTests: attempted, newTests: fresh };
    }, [tests]);
    // Quick actions (right rail)
    const quickActions = useMemo(() => [
        {
            icon: NotebookPen,
            label: "Draft rituals",
            description: "Generate rituals based on your latest test patterns.",
            actionLabel: "Create",
        },
        {
            icon: BookmarkCheck,
            label: "Saved Papers",
            description: "Open the layer where your summaries are stored.",
            actionLabel: "Open",
        },
    ], []);
    const startTest = (test) => {
        setCurrentTest(test);
        setStage("question");
        setSelected(null);
        setSaved(false);
        router.prefetch("/education/test");
    };
    const completeTest = () => {
        setStage("result");
    };
    const saveResult = () => {
        setSaved(true);
        // later connect to Saved Papers API
    };
    const goToFullTest = () => {
        router.push("/education/test");
    };
    return (<DashboardShell title="Education Tests" description="Track your astro learning, revisit completed tests, and follow a calm, guided roadmap." rightPanel={<QuickActionsPanel actions={quickActions}/>}>
      {/* TOP: Tests + Roadmap */}
      <section className="grid gap-6 lg:grid-cols-[2fr_minmax(260px,1fr)] items-start">
        {/* LEFT: Tests */}
        <div className="space-y-6">
          {/* New tests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                  New tests
                </p>
                <h2 className="font-mono text-lg text-gray-900">
                  Start a new learning block
                </h2>
              </div>
              <Badge className="rounded-full bg-yellow-100/90 text-xs text-yellow-900 border border-yellow-200">
                {newTests.length} available
              </Badge>
            </div>

            {newTests.length === 0 ? (<div className="rounded-2xl border border-yellow-100 bg-white p-5 text-sm text-gray-500">
                You’ve completed all current modules. New tests will appear here soon.
              </div>) : (<div className="grid gap-4 md:grid-cols-2">
                {newTests.map((test) => (<TestCard key={test.id} {...test} onStart={() => startTest(test)}/>))}
              </div>)}
          </div>

          {/* Attempted tests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Attempted
                </p>
                <h2 className="font-mono text-lg text-gray-900">Your test history</h2>
              </div>
              <Badge variant="outline" className="rounded-full border-gray-200 text-xs text-gray-600">
                {attemptedTests.length} completed / in progress
              </Badge>
            </div>

            {attemptedTests.length === 0 ? (<div className="rounded-2xl border border-yellow-100 bg-white p-5 text-sm text-gray-500">
                After you finish a test, it will appear here with quick status and recap.
              </div>) : (<div className="grid gap-4 md:grid-cols-2">
                {attemptedTests.map((test) => (<TestCard key={test.id} {...test} onStart={() => startTest(test)}/>))}
              </div>)}
          </div>
        </div>

        {/* RIGHT: Roadmap */}
        <motion.aside initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={motionConfig} className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                Roadmap
              </p>
              <h3 className="mt-1 font-mono text-lg text-gray-900">
                Current subject: Navamsa Essentials
              </h3>
            </div>
            <Sparkles className="h-5 w-5 text-yellow-500/90"/>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            A structured path for strengthening relationship astrology: foundations →
            house dynamics → karmic overlays → live synthesis.
          </p>

          {/* Steps */}
          <div className="mt-4 space-y-3">
            {[
            { label: "Module 1 · Foundations", status: "done" },
            { label: "Module 2 · House focus", status: "active" },
            { label: "Module 3 · Karmic layers", status: "up-next" },
            { label: "Module 4 · Live synthesis", status: "locked" },
        ].map((step, idx) => (<div key={step.label} className="flex items-center gap-2 text-xs text-gray-700">
                <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]", step.status === "done" &&
                "border-emerald-300 bg-emerald-50 text-emerald-700", step.status === "active" &&
                "border-yellow-400 bg-yellow-50 text-yellow-800", step.status === "up-next" &&
                "border-gray-200 bg-gray-50 text-gray-500", step.status === "locked" &&
                "border-gray-200 bg-white text-gray-400")}>
                  {idx + 1}
                </span>
                <span className={cn("flex-1", step.status === "done" && "line-through decoration-emerald-400/70", step.status === "locked" && "text-gray-400")}>
                  {step.label}
                </span>
              </div>))}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-[11px] text-gray-500">
              <span>Track completion</span>
              <span className="font-mono text-gray-700">42%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-yellow-50 border border-yellow-100 overflow-hidden">
              <div className="h-full w-[42%] rounded-full bg-yellow-400"/>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Button className="w-full rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300" onClick={goToFullTest}>
              Open full test flow
            </Button>
            <Button variant="outline" className="w-full rounded-full border-yellow-200 text-xs text-gray-700" onClick={() => startTest(newTests[0] ?? tests[0])}>
              Preview a sample question
            </Button>
          </div>
        </motion.aside>
      </section>

    </DashboardShell>);
}
