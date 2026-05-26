"use client";
import React, { useState, useEffect } from "react";
import { TestDashboard } from "@/components/education/test-dashboard";
import { availableTests as fallbackTests } from "@/lib/dashboard-data";
import { useKundliStore } from "@/lib/store";

export default function TestPage() {
    const { token, isAuthenticated } = useKundliStore();
    const [tests, setTests] = useState(fallbackTests);

    useEffect(() => {
        const fetchTestsData = async () => {
            try {
                // 1. Fetch all tests (accessible to anyone)
                const resTests = await fetch("/api/tests");
                if (!resTests.ok) return;
                const dataTests = await resTests.json();
                
                if (dataTests.status === "success" && dataTests.data?.tests) {
                    const allTests = dataTests.data.tests;
                    
                    // 2. Fetch history if user is logged in
                    let history = [];
                    if (isAuthenticated && token) {
                        const resHistory = await fetch("/api/tests/history", {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        if (resHistory.ok) {
                            const dataHistory = await resHistory.json();
                            if (dataHistory.status === "success" && dataHistory.data?.history) {
                                history = dataHistory.data.history;
                            }
                        }
                    }
                    
                    // 3. Map tests dynamically
                    const mappedTests = allTests.map((t) => {
                        // Find if there is a history entry for this test
                        const attempts = history.filter(h => h.test?._id === t._id || h.test === t._id);
                        const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
                        
                        const isCompleted = attempts.length > 0;
                        const scorePercent = latestAttempt ? Math.round((latestAttempt.score / (latestAttempt.totalQuestions || 10)) * 100) : 0;
                        
                        return {
                            id: t._id,
                            title: t.title,
                            duration: `${t.duration || 10} min`,
                            status: isCompleted ? "completed" : "not-started",
                            score: scorePercent,
                            focus: t.focus || "Astrology Fundamentals",
                            attempts: attempts.length,
                        };
                    });
                    
                    if (mappedTests.length > 0) {
                        setTests(mappedTests);
                    }
                }
            } catch (error) {
                console.error("Error loading live tests dashboard:", error);
            }
        };

        fetchTestsData();
    }, [token, isAuthenticated]);

    return <TestDashboard tests={tests}/>;
}

